import * as express from 'express';
import TokenValidator from "../../auth/helpers/TokenValidator";
import IReviewRepository from '../domain/IReviewRepository';
import ReviewController from './ReviewController';
import MessageController from './ReviewController';


export default class ReviewRouter {
    public static configure(repository: IReviewRepository,
        tokenValidator: TokenValidator,
    ): express.Router {
        const router = express.Router();
        let controller = new ReviewController(repository)

        router.get('/status',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.status(req, res)
        )
        /* router.post('/',
             (req, res, next) => tokenValidator.validate(req, res, next),
             (req, res) => controller.post(req, res)
         )
 */
        return router
    }
}