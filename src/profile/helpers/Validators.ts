import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const getProfilesByCategoryValidation = () => {
    return [
        body('categories', 'Category is required').notEmpty().isArray()
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