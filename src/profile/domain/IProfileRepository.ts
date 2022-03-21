import UserProfile from "./UserProfile";

export default interface IProfileRepository {
    find(userId: string): Promise<UserProfile>;
    add(userProfile: UserProfile): Promise<string>;
    update(userProfile: UserProfile): Promise<UserProfile>;
    delete(userId: string): Promise<string>;
    // addReviews(: string[]): Promise<string>;
}