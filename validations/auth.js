import { body } from "express-validator"; //для валидации

export const registerValidation = [
  body("email").isEmail(),

  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(), //типо обциолаьная проверка. Является ли эта ссылкой
];
 