import { Mongoose } from 'mongoose'
import IReviewRepository from '../../domain/IReviewRepository'
import Reviews from '../../domain/Review'

export default class ReviewRepository implements IReviewRepository {
    constructor(private readonly client: Mongoose) { }
    addReviews(review: Reviews): Promise<Reviews> {
        throw new Error('Method not implemented.')
    }
    updateReviews(review: Reviews): Promise<Reviews> {
        throw new Error('Method not implemented.')
    }
    removeReviews(reviewId: string): Promise<string> {
        throw new Error('Method not implemented.')
    }
    getAllReviews(userId: string): Promise<Array<Reviews>> {
        throw new Error('Method not implemented.')
    }

}