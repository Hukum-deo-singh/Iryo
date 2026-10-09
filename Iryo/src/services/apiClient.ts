// File: src/services/apiClient.ts

/**
 * IRYO API CLIENT
 *
 * Centralised HTTP client for communication between
 * the React Native application and the Java backend.
 *
 * Responsibilities:
 * - Send JSON requests
 * - Handle HTTP errors
 * - Handle network failures
 * - Support authenticated requests
 * - Apply request timeouts
 *
 * IMPORTANT:
 * This client does not implement authentication itself.
 * The backend remains responsible for authentication,
 * authorisation and data validation.
 */

// --------------------------------------------------
// TYPES
// --------------------------------------------------

export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  accessToken?: string;
  timeoutMs?: number;
};

export type ApiErrorPayload = {
  message?: string;
  error?: string;
  code?: string;
  detail?: string;
};

// --------------------------------------------------
// API ERROR
// --------------------------------------------------

export class ApiError extends Error {
  public readonly status: number | undefined;
  public readonly code: string | undefined;

  constructor(
    message: string,
    status?: number,
    code?: string
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// --------------------------------------------------
// API BASE URL
// --------------------------------------------------

function getApiBaseUrl(): string {
  const configuredUrl =
    process.env.EXPO_PUBLIC_API_URL?.trim();

  if (!configuredUrl) {
    throw new ApiError(
      "API URL is not configured. Set EXPO_PUBLIC_API_URL in your environment."
    );
  }

  // Remove trailing slashes.
  const baseUrl = configuredUrl.replace(/\/+$/, "");

  // The app should communicate with the backend over HTTPS
  // in production. Local HTTP may be used during development.
  if (
    !baseUrl.startsWith("https://") &&
    !baseUrl.startsWith("http://")
  ) {
    throw new ApiError(
      "Invalid API URL. The URL must start with https:// or http://."
    );
  }

  return baseUrl;
}

// --------------------------------------------------
// RESPONSE PARSING
// --------------------------------------------------

function parseResponseBody(
  responseText: string
): unknown {
  if (!responseText.trim()) {
    return null;
  }

  try {
    return JSON.parse(responseText) as unknown;
  } catch {
    // Preserve non-JSON responses so callers can handle them.
    return responseText;
  }
}

// --------------------------------------------------
// ERROR MESSAGE EXTRACTION
// --------------------------------------------------

function getApiErrorMessage(
  payload: unknown,
  fallbackMessage: string
): string {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (
    payload !== null &&
    typeof payload === "object"
  ) {
    const errorPayload = payload as ApiErrorPayload;

    if (
      typeof errorPayload.message === "string" &&
      errorPayload.message.trim()
    ) {
      return errorPayload.message;
    }

    if (
      typeof errorPayload.detail === "string" &&
      errorPayload.detail.trim()
    ) {
      return errorPayload.detail;
    }

    if (
      typeof errorPayload.error === "string" &&
      errorPayload.error.trim()
    ) {
      return errorPayload.error;
    }
  }

  return fallbackMessage;
}

// --------------------------------------------------
// REQUEST FUNCTION
// --------------------------------------------------

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  if (!path.trim()) {
    throw new ApiError(
      "API request path cannot be empty."
    );
  }

  const baseUrl = getApiBaseUrl();

  const requestPath = path.startsWith("/")
    ? path
    : `/${path}`;

  const url = `${baseUrl}${requestPath}`;

  const {
    method = "GET",
    body,
    headers = {},
    accessToken,
    timeoutMs = 15000,
  } = options;

  if (
    !Number.isFinite(timeoutMs) ||
    timeoutMs <= 0
  ) {
    throw new ApiError(
      "Request timeout must be a positive number."
    );
  }

  // ----------------------------------------------
  // REQUEST HEADERS
  // ----------------------------------------------

  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (accessToken) {
    requestHeaders.Authorization =
      `Bearer ${accessToken}`;
  }

  // ----------------------------------------------
  // REQUEST BODY
  // ----------------------------------------------

  const requestBody =
    body === undefined
      ? undefined
      : JSON.stringify(body);

  // ----------------------------------------------
  // TIMEOUT CONFIGURATION
  // ----------------------------------------------

  const controller = new AbortController();

  let timedOut = false;

  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  let response: Response;
  let responseText: string;

  try {
    response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: requestBody,
      signal: controller.signal,
    });

    responseText = await response.text();
  } catch {
    if (timedOut) {
      throw new ApiError(
        "The request timed out. Please try again.",
        undefined,
        "REQUEST_TIMEOUT"
      );
    }

    throw new ApiError(
      "Could not reach the Iryo backend. Check your network connection and API URL.",
      undefined,
      "NETWORK_ERROR"
    );
  } finally {
    clearTimeout(timeoutId);
  }

  // ----------------------------------------------
  // PARSE RESPONSE
  // ----------------------------------------------

  const payload = parseResponseBody(responseText);

  // HTTP 204 means the request succeeded without a body.
  if (response.status === 204) {
    if (!response.ok) {
      throw new ApiError(
        "The backend rejected the request.",
        response.status,
        "HTTP_ERROR"
      );
    }

    return undefined as T;
  }

  // ----------------------------------------------
  // HANDLE HTTP ERRORS
  // ----------------------------------------------

  if (!response.ok) {
    const fallbackMessage =
      `Request failed with HTTP status ${response.status}.`;

    const message = getApiErrorMessage(
      payload,
      fallbackMessage
    );

    let errorCode: string | undefined;

    if (
      payload !== null &&
      typeof payload === "object"
    ) {
      const errorPayload = payload as ApiErrorPayload;

      if (typeof errorPayload.code === "string") {
        errorCode = errorPayload.code;
      }
    }

    throw new ApiError(
      message,
      response.status,
      errorCode ?? "HTTP_ERROR"
    );
  }

  // ----------------------------------------------
  // SUCCESS
  // ----------------------------------------------

  return payload as T;
}