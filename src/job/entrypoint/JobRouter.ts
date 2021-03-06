import * as express from 'express';
import TokenValidator from "../../auth/helpers/TokenValidator";
import IProfileRepository from '../../profile/domain/IProfileRepository';
import IJobRepository from '../domain/IJobRepository';
import IJobActivityRepository from '../domain/JobActivity/IJobActivity';
import GenerateJobFeedUseCase from '../usecases/GenerateJobFeed';
import JobController from './JobController';


export default class JobRouter {
    public static configure(
        jobRepository: IJobRepository,
        userProfileRepository: IProfileRepository,
        jobActivityRepository: IJobActivityRepository,
        tokenValidator: TokenValidator,

    ): express.Router {
        const router = express.Router();
        let controller = JobRouter.composeController(
            jobRepository, userProfileRepository, jobActivityRepository
        )
        router.post('/:id/candidates',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.getListOfCandidates(req, res)
        )
        router.get('/listed',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.getListedJobs(req, res)
        )
        router.get('/getbystatus',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.findAllByStatus(req, res)
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
        router.post('/search',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.search(req, res)
        )
        router.delete('/:id',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.delete(req, res)
        )
        router.get('/',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.getJobFeedForUser(req, res)
        )

        router.post('/save/:id',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.saveJob(req, res)
        )
        router.post('/apply/:id',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.applyJob(req, res)
        )
        router.post('/jobdecision/:id',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.offerOrDenyJob(req, res)
        )
        router.post('/accept/:id',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.acceptJob(req, res)
        )

        return router
    }
    private static composeController(
        jobRepository: IJobRepository,
        ProfileRepository: IProfileRepository,
        jobActivityRepository: IJobActivityRepository,
    ): JobController {
        const generateJobFeedUseCase = new GenerateJobFeedUseCase(jobRepository, ProfileRepository);
        const controller = new JobController(
            jobRepository, jobActivityRepository, generateJobFeedUseCase,
        )
        return controller
    }
}

