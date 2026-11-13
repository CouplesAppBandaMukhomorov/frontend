
import { AuthError } from "./auth";

export function getAuthError(error: unknown): string {
  if (error instanceof AuthError) {
    switch (error.code) {
      case "email_already_registered":
        return "Этот email уже зарегистрирован";

      case "invalid_credentials":
        return "Неверный email или пароль";

      case "validation_error":
        return "Проверьте правильность заполнения полей";

      case "already_in_couple":
        return "Вы уже состоите в паре";

      default:
        return error.message || "Произошла ошибка";
    }
  }

  return "Не удалось подключиться к серверу";
}
