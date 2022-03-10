import { Mongoose } from 'mongoose'
import IProfileRepository from "../../domain/IProfileRepository";
import UserProfile from "../../domain/UserProfile";
import { UserProfileSchema } from '../models/UserProfileModel';


export default class ProfileRepository implements IProfileRepository {
    constructor(private readonly client: Mongoose) { }

    async find(userId: string): Promise<UserProfile> {
        const userProfileModel = this.client.model<UserProfile>('UserProfile', UserProfileSchema)
        const userProfile = await userProfileModel.findById(userId);
        if (userProfile === null) return Promise.reject('User profile does not exist')
        return new UserProfile(userProfile.userId, userProfile.gender, userProfile.accountType, userProfile.accountStatus, userProfile.avatar, userProfile.contactNumber, userProfile.educationId, userProfile.experienceId, userProfile.skillsId);

    }
    add(userId: string, gender?: string, accountType?: string, accountStatus?: string, avatar?: string, contactNumber?: string, educationId?: string, experienceId?: string, skills?: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    update(userId: string, gender?: string, accountType?: string, accountStatus?: string, avatar?: string, contactNumber?: string, educationId?: string, experienceId?: string, skills?: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}