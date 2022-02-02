import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const signupValidationRules = () => {
    return [
        body('username', 'Name is required').notEmpty(),
        body('email', 'Invalid email').notEmpty().isEmail().normalizeEmail(),

        body('password', 'Password is required (min 5 characters)')
            .if(body('auth_type').equals('email'))
            .notEmpty()
            .isLength({ min: 5 }),
    ]
}

export const signinValidationRules = () => {
    return [
        body('username', 'Username is required')
            .if(body('auth_type').not().equals('email'))
            .notEmpty(),
        body('email', 'Invalid email').not().isEmpty().isEmail().normalizeEmail(),
        body('password', 'Password is required (min 5 characters)')
            .if(body('auth_type').equals('email'))
            .notEmpty()
            .isLength({ min: 5 }),
    ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors: any = []
    errors
        .array({ onlyFirstError: true })
        .map((err: { param: any; msg: any }) => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({ errors: extractedErrors })
}