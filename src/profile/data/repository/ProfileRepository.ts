import { Mongoose } from 'mongoose'
import IProfileRepository from "../../domain/IProfileRepository";
import UserProfile from "../../domain/UserProfile";
import { UserProfileModel, UserProfileSchema } from '../models/UserProfileModel';


export default class ProfileRepository implements IProfileRepository {
    constructor(private readonly client: Mongoose) { }

    async add(userProfile: UserProfile): Promise<string> {
        const model = this.client.model<UserProfileModel>('profile', UserProfileSchema);
        const newProfile = new model({
            userId: userProfile.userId,
            accountType: userProfile.accountType,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            gender: userProfile.gender,
            accountStatus: userProfile.accountStatus,
            avatar: userProfile.avatar,
            contactNumber: userProfile.contactNumber,
            title: userProfile.title,
            about: userProfile.about,
            skills: userProfile.skills,
            reviews: userProfile.reviews,
        });
        await newProfile.save();
        return newProfile.id;
    }
    update(userProfile: UserProfile): Promise<UserProfile> {
        throw new Error('Method not implemented.');
    }


    delete(userId: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

    async find(userId: string): Promise<UserProfile> {
        const userProfileModel = this.client.model<UserProfile>('UserProfile', UserProfileSchema)
        const userProfile = await userProfileModel.findOne({ userId: userId });
        console.log('🏴: ' + userProfile + userId);
        if (userProfile === null) return Promise.reject('User profile does not exist')
        return new UserProfile(userProfile.userId, userProfile.accountType, userProfile.firstName, userProfile.lastName, userProfile.gender, userProfile.accountStatus, userProfile.avatar, userProfile.contactNumber, userProfile.title, userProfile.about, userProfile.skills, userProfile.reviews);
    }
}

