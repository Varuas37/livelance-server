
import UserProfile from "./UserProfile";

export default interface IProfileRepository {
    getProfile(profileId: string): Promise<UserProfile>
    findByUserId(userId: string): Promise<UserProfile>;
    add(userProfile: UserProfile): Promise<string>;
    update(userProfile: UserProfile): Promise<UserProfile>;
    delete(userId: string): Promise<string>;
    getProfilesByCategory(category: string[]): Promise<UserProfile[]>

}