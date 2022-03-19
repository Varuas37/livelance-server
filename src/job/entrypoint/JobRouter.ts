import * as express from 'express';
import TokenValidator from "../../auth/helpers/TokenValidator";
import IProfileRepository from '../../profile/domain/IProfileRepository';
import IJobRepository from '../domain/IJobRepository';
import GenerateJobFeedUseCase from '../usecases/GenerateJobFeed';
import JobController from './JobController';


export default class JobRouter {
    public static configure(jobRepository: IJobRepository, userProfileRepository: IProfileRepository,
        tokenValidator: TokenValidator,
    ): express.Router {
        const router = express.Router();
        let controller = JobRouter.composeController(
            jobRepository, userProfileRepository
        )

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
        router.get('/',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.getJobFeedForUser(req, res)
        )
        return router
    }
    private static composeController(
        jobRepository: IJobRepository,
        ProfileRepository: IProfileRepository,
    ): JobController {
        const generateJobFeedUseCase = new GenerateJobFeedUseCase(jobRepository, ProfileRepository);
        const controller = new JobController(
            jobRepository, generateJobFeedUseCase
        )
        return controller
    }
}

