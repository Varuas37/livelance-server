import Reviews from "./Review";
export default interface IReviewRepository {
    // REVIEWS
    addReviews(review: Reviews): Promise<Reviews>;
    updateReviews(review: Reviews): Promise<Reviews>;
    removeReviews(review: Reviews): Promise<Reviews>;
    getAllReviews(review: Reviews): Promise<Reviews>;

}