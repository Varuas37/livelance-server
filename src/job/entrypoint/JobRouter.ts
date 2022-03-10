import * as express from 'express';
import TokenValidator from "../../auth/helpers/TokenValidator";
import IJobRepository from '../data/repository/IJobRepository';
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
        return router
    }
}