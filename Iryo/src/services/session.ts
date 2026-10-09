// File: src/services/session.ts

/**
 * IRYO — SECURE SESSION MANAGEMENT
 *
 * Responsibilities:
 * - Store authentication sessions securely.
 * - Retrieve and validate stored sessions.
 * - Detect expired sessions.
 * - Clear sessions on logout.
 *
 * Important:
 * - Never store plaintext passwords.
 * - Never treat a User ID alone as authentication.
 * - The backend remains responsible for authentication
 *   and authorization.
 */

import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

// --------------------------------------------------
// STORAGE CONFIGURATION
// --------------------------------------------------

const SESSION_STORAGE_KEY = "iryo.auth.session.v1";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

export type IryoSessionUser = {
  /**
   * Keep the User ID as a string.
   * This preserves its exact representation.
   */
  userId: string;

  name?: string;
  email?: string;
};

export type IryoSession = {
  /**
   * Access token returned by the Java backend.
   */
  accessToken: string;

  /**
   * Optional refresh token.
   * Only populate this if the backend actually provides one.
   */
  refreshToken?: string;

  /**
   * Optional token type, usually "Bearer".
   */
  tokenType?: string;

  /**
   * Optional absolute expiry time in milliseconds
   * since the Unix epoch.
   */
  expiresAtMs?: number;

  user: IryoSessionUser;
};

// --------------------------------------------------
// CUSTOM ERROR
// --------------------------------------------------

export class SessionStorageError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "SessionStorageError";

    Object.setPrototypeOf(
      this,
      SessionStorageError.prototype
    );
  }
}

// --------------------------------------------------
// PLATFORM SUPPORT
// --------------------------------------------------

/**
 * SecureStore is used only on supported native platforms.
 *
 * This app does not fall back to localStorage for web,
 * because storing authentication tokens there would
 * require a separate security design.
 */
export function isSessionStorageAvailable(): boolean {
  return (
    Platform.OS === "android" ||
    Platform.OS === "ios"
  );
}

function assertSecureStorageAvailable(): void {
  if (!isSessionStorageAvailable()) {
    throw new SessionStorageError(
      "Secure session storage is unavailable on this platform. " +
        "Configure a platform-appropriate secure storage strategy " +
        "before enabling persistent authentication."
    );
  }
}

// --------------------------------------------------
// SESSION VALIDATION
// --------------------------------------------------

function isNonEmptyString(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function isValidSession(
  value: unknown
): value is IryoSession {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  if (!isNonEmptyString(candidate.accessToken)) {
    return false;
  }

  if (
    candidate.refreshToken !== undefined &&
    typeof candidate.refreshToken !== "string"
  ) {
    return false;
  }

  if (
    candidate.tokenType !== undefined &&
    typeof candidate.tokenType !== "string"
  ) {
    return false;
  }

  if (
    candidate.expiresAtMs !== undefined &&
    (
      typeof candidate.expiresAtMs !== "number" ||
      !Number.isFinite(candidate.expiresAtMs)
    )
  ) {
    return false;
  }

  const user = candidate.user;

  if (
    user === null ||
    typeof user !== "object" ||
    Array.isArray(user)
  ) {
    return false;
  }

  const sessionUser =
    user as Record<string, unknown>;

  if (!isNonEmptyString(sessionUser.userId)) {
    return false;
  }

  if (
    sessionUser.name !== undefined &&
    typeof sessionUser.name !== "string"
  ) {
    return false;
  }

  if (
    sessionUser.email !== undefined &&
    typeof sessionUser.email !== "string"
  ) {
    return false;
  }

  return true;
}

// --------------------------------------------------
// EXPIRY CHECK
// --------------------------------------------------

export function isSessionExpired(
  session: IryoSession,
  nowMs: number = Date.now()
): boolean {
  if (session.expiresAtMs === undefined) {
    return false;
  }

  return session.expiresAtMs <= nowMs;
}

// --------------------------------------------------
// SAVE SESSION
// --------------------------------------------------

/**
 * Stores the session returned by successful backend
 * authentication.
 *
 * The caller must provide a session created from the
 * actual Java backend response.
 */
export async function saveSession(
  session: IryoSession
): Promise<void> {
  assertSecureStorageAvailable();

  if (!isValidSession(session)) {
    throw new SessionStorageError(
      "Invalid session data. The authentication response must contain an access token and User ID."
    );
  }

  if (isSessionExpired(session)) {
    throw new SessionStorageError(
      "Cannot save an expired session."
    );
  }

  try {
    await SecureStore.setItemAsync(
      SESSION_STORAGE_KEY,
      JSON.stringify(session),
      {
        keychainAccessible:
          SecureStore.WHEN_UNLOCKED,
      }
    );
  } catch {
    // Never include tokens or secrets in error messages.
    throw new SessionStorageError(
      "The authentication session could not be stored securely."
    );
  }
}

// --------------------------------------------------
// GET SESSION
// --------------------------------------------------

/**
 * Returns the stored session if its structure is valid
 * and its known expiry time has not passed.
 *
 * This is local session-state checking, not proof that
 * the backend still considers the token valid.
 */
export async function getSession(): Promise<IryoSession | null> {
  assertSecureStorageAvailable();

  let storedValue: string | null;

  try {
    storedValue = await SecureStore.getItemAsync(
      SESSION_STORAGE_KEY
    );
  } catch {
    throw new SessionStorageError(
      "The saved authentication session could not be read securely."
    );
  }

  if (storedValue === null) {
    return null;
  }

  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(storedValue) as unknown;
  } catch {
    await removeInvalidSession();
    return null;
  }

  if (!isValidSession(parsedValue)) {
    await removeInvalidSession();
    return null;
  }

  if (isSessionExpired(parsedValue)) {
    await removeInvalidSession();
    return null;
  }

  return parsedValue;
}

// --------------------------------------------------
// REMOVE INVALID OR EXPIRED SESSION
// --------------------------------------------------

async function removeInvalidSession(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(
      SESSION_STORAGE_KEY
    );
  } catch {
    throw new SessionStorageError(
      "An invalid session was detected, but secure storage could not clear it."
    );
  }
}

// --------------------------------------------------
// GET ACCESS TOKEN
// --------------------------------------------------

/**
 * Convenience helper for code that needs the stored
 * access token.
 */
export async function getAccessToken(): Promise<string | null> {
  const session = await getSession();

  return session?.accessToken ?? null;
}

// --------------------------------------------------
// CLEAR SESSION
// --------------------------------------------------

/**
 * Clears the locally stored session.
 *
 * Call after a successful logout flow, or when the
 * application determines the session must be removed.
 */
export async function clearSession(): Promise<void> {
  assertSecureStorageAvailable();

  try {
    await SecureStore.deleteItemAsync(
      SESSION_STORAGE_KEY
    );
  } catch {
    throw new SessionStorageError(
      "The authentication session could not be removed securely."
    );
  }
}