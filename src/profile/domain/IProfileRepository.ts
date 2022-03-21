import Reviews from "./Review";
import UserProfile from "./UserProfile";

export default interface IProfileRepository {
    find(userId: string): Promise<UserProfile>;
    add(userProfile: UserProfile): Promise<string>;
    update(userProfile: UserProfile): Promise<UserProfile>;
    delete(userId: string): Promise<string>;
    // REVIEWS
    addReviews(review: Reviews): Promise<Reviews>;
    updateReviews(review: Reviews): Promise<Reviews>;
    removeReviews(review: Reviews): Promise<Reviews>;
    getAllReviews(review: Reviews): Promise<Reviews>;
}