import express from 'express';
import IJobRepository from '../domain/IJobRepository';
import { Job } from '../domain/Job';


export default class JobController {
    constructor(private readonly repository: IJobRepository) { };

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Job endpoint is running 💅' })
    }

    public async post(req: express.Request, res: express.Response) {
        try {
            const { postedOn, jobTitle, jobDescription, category, subCategory, skills, postedBy, duration, rate, rateDuration, location, zipcode } = req.body

            const job = new Job(postedOn, jobTitle, jobDescription, category, subCategory, skills, postedBy, duration, rate, rateDuration, location, zipcode)
            return this.repository.createJob(job)
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
            return this.repository.getJobFeedForUser(skills, category, subCategory)
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