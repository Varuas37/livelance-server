import express from 'express';
import IProfileRepository from '../../profile/domain/IProfileRepository';
import IJobRepository from '../domain/IJobRepository';
import { Job } from '../domain/Job';
import GenerateJobFeedUseCase from '../usecases/GenerateJobFeed';

export default class JobController {
    private readonly generateJobFeedUseCase: GenerateJobFeedUseCase
    private readonly repository: IJobRepository

    constructor(
        repository: IJobRepository,
        generateJobfeedUseCase: GenerateJobFeedUseCase
    ) {

        this.repository = repository
        this.generateJobFeedUseCase = generateJobfeedUseCase
    };

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Job endpoint is running 💅' })
    }

    public async post(req: express.Request, res: express.Response) {
        try {
            console.log('🔪' + req.body);
            const userID = req.user;
            console.log('👀' + userID);

            const { postedOn, jobTitle, jobDescription, category, subCategory, skills, duration, rate, rateDuration, location, zipcode } = req.body
            const job = new Job(postedOn, jobTitle, jobDescription, category, subCategory, skills, userID, duration, rate, rateDuration, location, zipcode)
            return this.repository.createJob(job)
                .then((job) =>
                    res.status(200).json({
                        job: job,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            console.log('error:' + err);
            return res.status(400).json({ error: err })
        }
    }

    public async findOne(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            return this.repository.findOne(id)
                .then((job) =>
                    res.status(200).json({
                        job: job,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async delete(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            return this.repository.delete(id)
                .then((id) =>
                    res.status(200).json({
                        jobId: id,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }
    public async getJobFeedForUser(req: express.Request, res: express.Response) {
        try {
            const { skills, category, subCategory } = req.body
            const userId = req.user
            return this.generateJobFeedUseCase.execute(userId, category, subCategory)
                .then((jobs) =>

                    res.status(200).json({
                        jobs: jobs,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

}



declare module 'express-serve-static-core' {
    interface Request {
        user?: any
    }
}