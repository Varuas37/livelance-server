import * as express from 'express';
import TokenValidator from "../../auth/helpers/TokenValidator";
import IJobRepository from '../domain/IJobRepository';
import ProfileController from './JobController';

export default class JobRouter {
    public static configure(repository: IJobRepository,
        tokenValidator: TokenValidator,
    ): express.Router {
        const router = express.Router();
        let controller = new ProfileController(repository)
        router.get('/status',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.status(req, res)
        )

        router.post('/',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.post(req, res)
        )

        router.get('/:id',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.findOne(req, res)
        )
        router.delete('/:id',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.delete(req, res)
        )
        router.get('/feed',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.getJobFeedForUser(req, res)
        )
        return router
    }
}