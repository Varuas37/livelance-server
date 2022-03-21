import express from 'express';
import IReviewRepository from '../domain/IReviewRepository';



export default class ReviewController {

    constructor(private readonly repository: IReviewRepository) { };

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Review endpoint is running 💅' })
    }

    /*public async post(req: express.Request, res: express.Response) {
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
    }*/





}

declare module 'express-serve-static-core' {
    interface Request {
        user?: any
    }
}