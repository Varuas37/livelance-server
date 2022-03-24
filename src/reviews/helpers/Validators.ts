import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const addReviewValidationRules = () => {
    return [
        body('title', 'Title cannot be empty').notEmpty(),
        body('content', 'Content cannot be empty').notEmpty(),
        body('profileId', 'Profile Id cannot be empty').notEmpty(),
        body('authorId', 'Author Id cannot be empty').notEmpty(),
        body('rating', 'Rating should be integer values between 1 and 5').notEmpty().isInt({ min: 1, max: 5 })
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