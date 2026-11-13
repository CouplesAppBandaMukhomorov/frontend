
const API_URL = "http://localhost:8000";

// Данные для регистрации
interface RegisterRequest {
  email: string;
  password: string;
  display_name: string;
}

// Данные для входа
interface LoginRequest {
  email: string;
  password: string;
}

// Ответ сервера при успешной авторизации
export interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

// Ошибка валидации отдельного поля
interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

// Ошибка от сервера
interface ApiErrorResponse {
  code?: string;
  detail?: string;
  errors?: ValidationError[];
}

// Класс ошибки API
export class AuthError extends Error {
  status: number;
  code?: string;
  errors: ValidationError[];

  constructor(
    message: string,
    status: number,
    code?: string,
    errors: ValidationError[] = []
  ) {
    super(message);
    this.name = "AuthError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

// Общая функция запросов
// async function authRequest(
//   endpoint: string,
//   data: RegisterRequest | LoginRequest
// ): Promise<AuthResponse> {
//   const response = await fetch(
//     `${API_URL}/api/v1/auth/${endpoint}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );

//   const result: unknown = await response
//     .json()
//     .catch(() => ({}));

//   const errorData = result as ApiErrorResponse;

//   if (!response.ok) {
//     throw new AuthError(
//       errorData.detail || "Произошла ошибка",
//       response.status,
//       errorData.code,
//       errorData.errors || []
//     );
//   }

//   return result as AuthResponse;
// }


async function authRequest(
    endpoint: string,
    data: RegisterRequest | LoginRequest
): Promise<AuthResponse> {
    const response = await fetch(
        `${API_URL}/api/v1/auth/${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const responseText = await response.text();

    let result: ApiErrorResponse | AuthResponse;

    try {
        result = responseText
            ? JSON.parse(responseText)
            : {};
    } catch {
        result = {};
    }

    console.log("Auth status:", response.status);
    console.log("Auth response:", result);

    if (!response.ok) {
        const errorData = result as ApiErrorResponse;

        throw new AuthError(
            errorData.detail || "Произошла ошибка",
            response.status,
            errorData.code,
            errorData.errors || []
        );
    }

    return result as AuthResponse;
}


// Регистрация
export function register(
  email: string,
  password: string,
  display_name: string
): Promise<AuthResponse> {
  return authRequest("register", {
    email,
    password,
    display_name,
  });
}

// Авторизация
export function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  return authRequest("login", {
    email,
    password,
  });
}
