import { Mongoose } from 'mongoose'
import IReviewRepository from '../../domain/IReviewRepository'
import Review from '../../domain/Review'

export default class ReviewRepository implements IReviewRepository {
    constructor(private readonly client: Mongoose) { }
    addReviews(review: Review): Promise<Review> {
        throw new Error('Method not implemented.')
    }
    updateReviews(review: Review): Promise<Review> {
        throw new Error('Method not implemented.')
    }
    removeReviews(review: Review): Promise<Review> {
        throw new Error('Method not implemented.')
    }
    getAllReviews(review: Review): Promise<Review> {
        throw new Error('Method not implemented.')
    }

}