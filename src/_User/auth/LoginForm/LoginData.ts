import { validateEmail } from "@utils/utils";

export const isValidFormData = (
  email: string | null,
  password: string | null,
  lang: string,
) => {
  const errorData = loginFormErrorData[lang as keyof typeof loginFormErrorData];

  if (email === null || email === "")
    return { err: errorData.emailEmpty, valid: false };

  if (email.includes(" "))
    return { err: errorData.emailWhitespace, valid: false };

  if (email.length <= 5) return { err: errorData.emailMinLength, valid: false };

  if (email.length > 200)
    return { err: errorData.emailMaxLength, valid: false };

  if (!validateEmail(email))
    return { err: errorData.emailIncorrect, valid: false };

  //--------------------------------------------------

  if (password === null || password === "")
    return { err: errorData.passEmpty, valid: false };

  if (password.includes(" "))
    return { err: errorData.passWhitespace, valid: false };

  if (password.length < 5)
    return { err: errorData.passMinLength, valid: false };

  if (password.length > 30)
    return { err: errorData.passMaxLength, valid: false };

  return { err: "", valid: true };
};

export const loginFormErrorData = {
  ru: {
    emailEmpty: "Поле Email не заполнено",
    emailWhitespace: "Не используйте пробелы в Email",
    emailMinLength: "Email слишком короткий",
    emailMaxLength: "Email слишком длинный",
    emailIncorrect: "Неверный формат email адреса",

    passEmpty: "Поле Password не заполнено",
    passWhitespace: "Не используйте пробелы в пароле",
    passMinLength: "Минимальная длина пароля 5 символов",
    passMaxLength: "Максимальная длина пароля 30 символов",
  },
  en: {
    emailEmpty: "Email field is empty",
    emailWhitespace: "Do not use spaces in your email",
    emailMinLength: "Email too short",
    emailMaxLength: "Email too long",
    emailIncorrect: "Invalid email address format",

    passEmpty: "Password field is empty",
    passWhitespace: "Do not use spaces in your password",
    passMinLength: "Minimum password length 5 characters",
    passMaxLength: "Maximum password length 30 characters",
  },
};
