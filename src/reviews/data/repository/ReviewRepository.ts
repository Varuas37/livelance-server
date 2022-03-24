import { Mongoose } from 'mongoose'
import IReviewRepository from '../../domain/IReviewRepository'
import Reviews from '../../domain/Review'
import { ReviewDocument, ReviewModel, ReviewSchema } from '../model/ReviewModel'

export default class ReviewRepository implements IReviewRepository {
    constructor(private readonly client: Mongoose) { }


    async addReviews(review: Reviews): Promise<Reviews> {
        const model = this.client.model<ReviewDocument>(
            Reviews.modelName,
            ReviewSchema
        ) as ReviewModel;

        const newReview = new model({
            postedOn: review.postedOn,
            profileId: review.profileId,
            authorId: review.authorId,
            title: review.title,
            content: review.content,
            rating: review.rating,
        })
        newReview.save();
        return newReview;
    }
    async updateReviews(review: Reviews, reviewId: string): Promise<Reviews> {
        const model = this.client.model<ReviewDocument>(
            Reviews.modelName,
            ReviewSchema
        ) as ReviewModel;
        var updatedFields: { [propName: string]: any } = {};
        if (review.title) updatedFields.title = review.title;
        if (review.content) updatedFields.content = review.content;
        if (review.rating) updatedFields.rating = review.rating;

        var result = await model.findById(reviewId);
        await result.update(updatedFields);
        return result;
    }
    async removeReviews(reviewId: string): Promise<string> {
        const model = this.client.model<ReviewDocument>(
            Reviews.modelName,
            ReviewSchema
        ) as ReviewModel;
        const result = await model.findByIdAndRemove(reviewId)
        if (result === null) return Promise.reject('Review Not Found')
        await result.remove();
        return reviewId;
    }
    async getAllReviews(userId: string): Promise<Array<Reviews>> {
        const model = this.client.model<ReviewDocument>(
            Reviews.modelName,
            ReviewSchema
        ) as ReviewModel;
        var reviews = model.find({ profileId: userId });
        return reviews;
    }

    async getSummaryOfReviews(userId: string): Promise<{ [propName: string]: any; }> {
        const model = this.client.model<ReviewDocument>(Reviews.modelName, ReviewSchema);

        return {
            'asd': 'asdssad'
        };
    }
}