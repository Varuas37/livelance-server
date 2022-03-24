
import UserProfile from "./UserProfile";

export default interface IProfileRepository {
    getProfile(profileId: string): Promise<UserProfile>
    findByUserId(userId: string): Promise<UserProfile>;
    add(userProfile: UserProfile): Promise<string>;
    update(userProfile: UserProfile): Promise<UserProfile>;
    delete(userId: string): Promise<string>;
    // For employers
    getProfilesByCategory(category: string[]): Promise<UserProfile[]>
    getNearbyUsers(category: string[], zipcode: string): Promise<UserProfile[]>

}