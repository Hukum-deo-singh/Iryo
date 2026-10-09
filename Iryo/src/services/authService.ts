// File: src/services/authService.ts

/**
 * IRYO — AUTHENTICATION SERVICE
 *
 * Responsibilities:
 * - Login through the Java backend.
 * - Register new users through the Java backend.
 * - Validate API responses.
 * - Save authenticated sessions securely.
 *
 * Important:
 * - The backend generates the unique User ID.
 * - The backend verifies passwords.
 * - Passwords are never stored locally.
 * - Endpoint paths and response contracts must match
 *   the actual Java backend implementation.
 */

import {
  apiRequest,
  ApiError,
} from "./apiClient";

import {
  saveSession,
  type IryoSessionUser,
} from "./session";

// --------------------------------------------------
// API ENDPOINTS
// --------------------------------------------------

/**
 * PROPOSED ENDPOINTS — NOT YET VERIFIED.
 *
 * Confirm these paths with Member 3 before integration.
 */
export const AUTH_ENDPOINTS = {
  login: "/auth/login",
  signup: "/auth/signup",
} as const;

// --------------------------------------------------
// TYPES
// --------------------------------------------------

export type LoginCredentials = {
  userId: string;
  password: string;
};

export type SignupCredentials = {
  fullName: string;
  email: string;
  password: string;
};

export type SignupResult = {
  user: IryoSessionUser;
  message?: string;
};

// --------------------------------------------------
// AUTHENTICATION ERROR
// --------------------------------------------------

export class AuthServiceError extends Error {
  public readonly code: string;

  public readonly status?: number;

  constructor(
    message: string,
    code = "AUTH_ERROR",
    status?: number
  ) {
    super(message);

    this.name = "AuthServiceError";
    this.code = code;
    this.status = status;

    Object.setPrototypeOf(
      this,
      AuthServiceError.prototype
    );
  }
}

// --------------------------------------------------
// RESPONSE HELPERS
// --------------------------------------------------

function isObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function requireString(
  value: unknown,
  fieldName: string
): string {
  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    throw new AuthServiceError(
      `The authentication response is missing a valid ${fieldName}.`,
      "INVALID_API_RESPONSE"
    );
  }

  return value.trim();
}

function normalizeUserId(value: unknown): string {
  let userId: string;

  if (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value > 0
  ) {
    userId = String(value);
  } else if (
    typeof value === "string" &&
    /^[0-9]+$/.test(value)
  ) {
    userId = value;
  } else {
    throw new AuthServiceError(
      "The backend returned an invalid User ID.",
      "INVALID_USER_ID"
    );
  }

  return userId;
}

function parseUser(
  value: unknown
): IryoSessionUser {
  if (!isObject(value)) {
    throw new AuthServiceError(
      "The backend response does not contain valid user information.",
      "INVALID_API_RESPONSE"
    );
  }

  const userId = normalizeUserId(value.userId);

  const user: IryoSessionUser = {
    userId,
  };

  if (typeof value.name === "string") {
    user.name = value.name;
  }

  if (typeof value.email === "string") {
    user.email = value.email;
  }

  return user;
}

function mapApiError(error: unknown): never {
  if (error instanceof AuthServiceError) {
    throw error;
  }

  if (error instanceof ApiError) {
    throw new AuthServiceError(
      error.message,
      error.code ?? "API_ERROR",
      error.status
    );
  }

  throw new AuthServiceError(
    "An unexpected authentication error occurred. Please try again.",
    "UNEXPECTED_ERROR"
  );
}

// --------------------------------------------------
// LOCAL INPUT VALIDATION
// --------------------------------------------------

function validateLoginInput(
  credentials: LoginCredentials
): void {
  if (!/^[0-9]+$/.test(credentials.userId.trim())) {
    throw new AuthServiceError(
      "Enter your numeric Iryo User ID.",
      "INVALID_USER_ID"
    );
  }

  if (credentials.password.length === 0) {
    throw new AuthServiceError(
      "Enter your account password.",
      "PASSWORD_REQUIRED"
    );
  }
}

function validateSignupInput(
  credentials: SignupCredentials
): void {
  const name = credentials.fullName.trim();

  const email = credentials.email.trim();

  if (name.length < 2) {
    throw new AuthServiceError(
      "Enter your full name.",
      "INVALID_NAME"
    );
  }

  if (name.length > 100) {
    throw new AuthServiceError(
      "Your name is too long.",
      "INVALID_NAME"
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new AuthServiceError(
      "Enter a valid email address.",
      "INVALID_EMAIL"
    );
  }

  if (email.length > 254) {
    throw new AuthServiceError(
      "Your email address is too long.",
      "INVALID_EMAIL"
    );
  }

  if (credentials.password.length < 8) {
    throw new AuthServiceError(
      "Password must contain at least 8 characters.",
      "WEAK_PASSWORD"
    );
  }
}

// --------------------------------------------------
// LOGIN
// --------------------------------------------------

/**
 * Expected backend response:
 *
 * {
 *   "accessToken": "server-issued-token",
 *   "refreshToken": "optional-server-issued-token",
 *   "tokenType": "Bearer",
 *   "expiresInSeconds": 3600,
 *   "user": {
 *     "userId": 104582,
 *     "name": "Example User",
 *     "email": "user@example.com"
 *   }
 * }
 *
 * This is a PROPOSED contract, not a verified response
 * from the Iryo Java backend.
 */

export async function login(
  credentials: LoginCredentials
): Promise<IryoSessionUser> {
  validateLoginInput(credentials);

  try {
    const response: unknown = await apiRequest<unknown>(
      AUTH_ENDPOINTS.login,
      {
        method: "POST",
        timeoutMs: 15000,

        body: {
          userId: credentials.userId.trim(),

          // Do not trim passwords. Spaces may be intentional.
          password: credentials.password,
        },
      }
    );

    if (!isObject(response)) {
      throw new AuthServiceError(
        "The backend returned an invalid login response.",
        "INVALID_API_RESPONSE"
      );
    }

    const accessToken = requireString(
      response.accessToken,
      "accessToken"
    );

    const user = parseUser(response.user);

    const expiresInSeconds = response.expiresInSeconds;

    if (
      typeof expiresInSeconds !== "number" ||
      !Number.isFinite(expiresInSeconds) ||
      expiresInSeconds <= 0
    ) {
      throw new AuthServiceError(
        "The backend did not return a valid token expiry.",
        "INVALID_TOKEN_EXPIRY"
      );
    }

    const tokenType =
      response.tokenType === undefined
        ? "Bearer"
        : requireString(
            response.tokenType,
            "tokenType"
          );

    if (tokenType.toLowerCase() !== "bearer") {
      throw new AuthServiceError(
        "The backend returned an unsupported token type.",
        "UNSUPPORTED_TOKEN_TYPE"
      );
    }

    let refreshToken: string | undefined;

    if (response.refreshToken !== undefined) {
      refreshToken = requireString(
        response.refreshToken,
        "refreshToken"
      );
    }

    const session = {
      accessToken,
      tokenType,
      expiresAtMs:
        Date.now() + expiresInSeconds * 1000,
      user,

      ...(refreshToken !== undefined
        ? { refreshToken }
        : {}),
    };

    // Store only server-issued authentication material.
    // Never store the user's password.
    await saveSession(session);

    return user;
  } catch (error) {
    mapApiError(error);
  }
}

// --------------------------------------------------
// SIGNUP
// --------------------------------------------------

/**
 * Expected backend response:
 *
 * {
 *   "userId": 104582,
 *   "name": "Example User",
 *   "email": "user@example.com",
 *   "message": "Account created successfully"
 * }
 *
 * The backend must generate the unique User ID.
 * The frontend must never generate a fake ID.
 */

export async function signup(
  credentials: SignupCredentials
): Promise<SignupResult> {
  validateSignupInput(credentials);

  try {
    const response: unknown = await apiRequest<unknown>(
      AUTH_ENDPOINTS.signup,
      {
        method: "POST",
        timeoutMs: 15000,

        body: {
          name: credentials.fullName.trim(),
          email: credentials.email.trim().toLowerCase(),
          password: credentials.password,
        },
      }
    );

    if (!isObject(response)) {
      throw new AuthServiceError(
        "The backend returned an invalid registration response.",
        "INVALID_API_RESPONSE"
      );
    }

    const user = parseUser({
      userId: response.userId,
      name: response.name,
      email: response.email,
    });

    const result: SignupResult = {
      user,
    };

    if (typeof response.message === "string") {
      result.message = response.message;
    }

    // Signup does not automatically create an authenticated
    // session. The backend's actual registration contract
    // determines whether the user must log in afterward.

    return result;
  } catch (error) {
    mapApiError(error);
  }
}