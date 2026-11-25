const API_URL = `${(import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "")}/api/v1`;

interface ErrorBody {
  code?: string;
  detail?: string;
  errors?: { loc: (string | number)[]; msg: string; type: string }[];
}

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly errors: ErrorBody["errors"];

  constructor(
    status: number,
    code?: string,
    errors: ErrorBody["errors"] = [],
  ) {
    super(code || "request_failed");
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiError(response.status, "invalid_response");
  }
}

function asError(response: Response, body: unknown): ApiError {
  const error = body && typeof body === "object" ? body as ErrorBody : {};
  return new ApiError(response.status, error.code, error.errors);
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new ApiError(401, "invalid_token");

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  const body = await readJson(response);
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    throw asError(response, body);
  }

  const tokens = body as Tokens;
  if (!tokens?.access_token || !tokens?.refresh_token) {
    throw new ApiError(response.status, "invalid_response");
  }
  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("refresh_token", tokens.refresh_token);
  return tokens.access_token;
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  let token = localStorage.getItem("access_token");
  if (!token) throw new ApiError(401, "missing_token");

  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await readJson(response);

    if (response.status === 401 && (body as ErrorBody | null)?.code === "invalid_token" && attempt === 0) {
      token = await refreshAccessToken();
      continue;
    }
    if (response.status === 401 && (body as ErrorBody | null)?.code === "invalid_token") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    if (!response.ok) throw asError(response, body);
    return body as T;
  }

  throw new ApiError(401, "invalid_token");
}

export function getCloudError(error: unknown): string {
  if (!(error instanceof ApiError)) return "Не удалось подключиться к серверу. Попробуйте ещё раз.";

  switch (error.code) {
    case "already_in_couple": return "Вы уже состоите в паре.";
    case "couple_required": return "Сначала создайте пространство.";
    case "couple_is_full": return "В этом пространстве уже два участника.";
    case "invitation_not_found": return "Приглашение с таким кодом не найдено.";
    case "invitation_expired": return "Срок действия приглашения истёк. Попросите новый код.";
    case "invitation_not_active": return "Приглашение уже использовано или отменено.";
    case "cannot_accept_own_invitation": return "Нельзя принять собственное приглашение.";
    case "validation_error": return "Проверьте введённые данные.";
    case "invalid_response": return "Сервер вернул некорректный ответ. Попробуйте ещё раз.";
    default: return "Не удалось выполнить запрос. Попробуйте ещё раз.";
  }
}
