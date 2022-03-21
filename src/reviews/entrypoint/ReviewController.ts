import express from 'express';
import IReviewRepository from '../domain/IReviewRepository';
import Reviews from '../domain/Review';



export default class ReviewController {

    constructor(private readonly repository: IReviewRepository) { };

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Review endpoint is running 💅' })
    }

    public async post(req: express.Request, res: express.Response) {
        try {
            const { postedOn, profileId, authorId, title, content, rating } = req.body
            const review = new Reviews(postedOn, profileId, authorId, title, content, rating);
            return this.repository.addReviews(review)
                .then((addedReview) =>
                    res.status(200).json({
                        review: addedReview,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async update(req: express.Request, res: express.Response) {
        try {
            const { postedOn, profileId, authorId, title, content, rating } = req.body
            const review = new Reviews(postedOn, profileId, authorId, title, content, rating);
            return this.repository.updateReviews(review)
                .then((addedReview) =>
                    res.status(200).json({
                        review: addedReview,
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

            return this.repository.removeReviews(id)
                .then((deletedReview) =>
                    res.status(200).json({
                        review: deletedReview,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }
    public async get(req: express.Request, res: express.Response) {
        try {
            const userID = req.user;

            return this.repository.getAllReviews(userID)
                .then((reviews) =>
                    res.status(200).json({
                        review: reviews,
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