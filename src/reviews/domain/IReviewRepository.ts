import Reviews from "./Review";
export default interface IReviewRepository {
    // REVIEWS
    addReviews(review: Reviews): Promise<Reviews>;
    updateReviews(review: Reviews, reviewId: string): Promise<Reviews>;
    removeReviews(reviewId: string): Promise<string>;
    getAllReviews(userId: string): Promise<Array<Reviews>>;
    getSummaryOfReviews(userId: string): Promise<{ [propName: string]: any }>;

}