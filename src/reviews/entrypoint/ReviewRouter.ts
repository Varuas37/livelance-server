import * as express from 'express';
import TokenValidator from "../../auth/helpers/TokenValidator";
import IReviewRepository from '../domain/IReviewRepository';
import { addReviewValidationRules, validate } from '../helpers/Validators';
import ReviewController from './ReviewController';



export default class ReviewRouter {
    public static configure(repository: IReviewRepository,
        tokenValidator: TokenValidator,
    ): express.Router {
        const router = express.Router();
        let controller = new ReviewController(repository)


        router.get('/:id/summary',
            (req: express.Request, res: express.Response, next) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response,) => controller.getSummary(req, res)
        )
        router.get('/status',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.status(req, res)
        )
        router.post('/',
            addReviewValidationRules(),
            validate,
            (req: express.Request, res: express.Response, next: express.NextFunction) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response,) => controller.post(req, res)
        )
        router.put('/',
            addReviewValidationRules(),
            validate,
            (req: express.Request, res: express.Response, next: express.NextFunction) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response,) => controller.update(req, res)
        )

        router.delete('/:id',
            (req: express.Request, res: express.Response, next) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response,) => controller.delete(req, res)
        )

        router.get('/:id',
            (req: express.Request, res: express.Response, next) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response,) => controller.get(req, res)
        )



        return router
    }
}