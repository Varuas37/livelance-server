import { Mongoose } from 'mongoose'
import { UserProfileDocument, UserProfileSchema } from '../../../profile/data/models/UserProfileModel';
import UserProfile from '../../../profile/domain/UserProfile';
import IReviewRepository from '../../domain/IReviewRepository'
import Reviews from '../../domain/Reviews'
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
    async getAllReviews(profileId: string): Promise<Array<Reviews>> {
        const model = this.client.model<ReviewDocument>(
            Reviews.modelName,
            ReviewSchema
        ) as ReviewModel;
        var reviews = model.find({ profileId: profileId });
        return reviews;
    }

    async getSummaryOfReviews(profileId: string): Promise<{ [propName: string]: any; }> {
        const model = this.client.model<ReviewDocument>(Reviews.modelName, ReviewSchema);

        const oneRating = Number((await model.countDocuments({ rating: 1, profileId: profileId }).exec()).toString());
        const twoRating = Number((await model.countDocuments({ rating: 2, profileId: profileId }).exec()).toString());
        const threeRating = Number((await model.countDocuments({ rating: 3, profileId: profileId }).exec()).toString());
        const fourRating = Number((await model.countDocuments({ rating: 4, profileId: profileId }).exec()).toString());
        const fiveRating = Number((await model.countDocuments({ rating: 5, profileId: profileId }).exec()).toString());

        const totalCount = oneRating + twoRating + threeRating + fourRating + fiveRating

        const averageRating = (1 * oneRating + 2 * twoRating + 3 * threeRating + 4 * fourRating + 5 * fiveRating) / totalCount

        return {
            average: averageRating,
            totalCount: totalCount,
            counts: [
                { rating: 5, count: fiveRating },
                { rating: 4, count: fourRating },
                { rating: 3, count: threeRating },
                { rating: 2, count: twoRating },
                { rating: 1, count: oneRating },
            ],
        }
    }
}