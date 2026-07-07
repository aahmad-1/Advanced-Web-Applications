import {body} from "express-validator";

export const registerValidation = [
    body("email").trim().escape().isEmail(),
    body("username").trim().escape().isLength({ min: 3, max: 25 }),
    body("password")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
];

export const loginValidation = [
    body("email").trim().escape().isEmail(),
    body("password").trim()
];