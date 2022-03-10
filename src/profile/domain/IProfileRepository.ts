import UserProfile from "./UserProfile";

export default interface IProfileRepository {
    find(userId: string): Promise<UserProfile>;
    add(
        userId: string,
        gender?: string,
        accountType?: string,
        accountStatus?: string,
        avatar?: string,
        contactNumber?: string,
        educationId?: string,
        experienceId?: string,
        skills?: string,
    ): Promise<string>;

    update(
        userId: string,
        gender?: string,
        accountType?: string,
        accountStatus?: string,
        avatar?: string,
        contactNumber?: string,
        educationId?: string,
        experienceId?: string,
        skills?: string,
    ): Promise<string>;


}