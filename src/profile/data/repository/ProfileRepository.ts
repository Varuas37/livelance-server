import { Mongoose } from 'mongoose'
import User from '../../../auth/domain/User';
import IProfileRepository from "../../domain/IProfileRepository";
import UserProfile from "../../domain/UserProfile";
import { UserProfileDocument, UserProfileModel, UserProfileSchema } from '../models/UserProfileModel';


export default class ProfileRepository implements IProfileRepository {
    constructor(private readonly client: Mongoose) { }

    async add(userProfile: UserProfile): Promise<string> {
        const model = this.client.model<UserProfileDocument>('profile', UserProfileSchema);
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
    async update(userProfile: UserProfile): Promise<UserProfile> {
        const model = this.client.model<UserProfileDocument>('profile', UserProfileSchema);
        const query = { userId: userProfile.userId }
        // THIS ONLY UPDATES THE FIELDS THAT ARE NOT NULL
        var updatedFields: { [propName: string]: any } = {};
        if (userProfile.accountType) updatedFields.accountType = userProfile.accountType;
        if (userProfile.firstName) updatedFields.firstName = userProfile.firstName;
        if (userProfile.lastName) updatedFields.lastName = userProfile.lastName;
        if (userProfile.gender) updatedFields.gender = userProfile.gender;
        if (userProfile.accountStatus) updatedFields.accountStatus = userProfile.accountStatus;
        if (userProfile.avatar) updatedFields.avatar = userProfile.avatar;
        if (userProfile.contactNumber) updatedFields.contactNumber = userProfile.contactNumber;
        if (userProfile.title) updatedFields.title = userProfile.title;
        if (userProfile.about) updatedFields.about = userProfile.about;
        if (userProfile.skills) updatedFields.skills = userProfile.skills;
        if (userProfile.reviews) updatedFields.reviews = userProfile.reviews;

        var result = await model.updateOne(query, updatedFields);
        if (result === null) return Promise.reject('Failed Updating Profile')
        const updatedProfile = await this.find(userProfile.userId);
        return new UserProfile(updatedProfile.userId, updatedProfile.accountType, updatedProfile.firstName, updatedProfile.lastName, updatedProfile.gender, updatedProfile.accountStatus, updatedProfile.avatar, updatedProfile.contactNumber, updatedProfile.title, updatedProfile.about, updatedProfile.skills, updatedProfile.reviews);
    }

    delete(userId: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

    async find(userId: string): Promise<UserProfile> {
        const userProfileModel = this.client.model<UserProfileDocument>('profile', UserProfileSchema)
        const userProfile = await userProfileModel.findOne({ userId: userId });
        if (userProfile === null) return Promise.reject('User profile does not exist')
        return new UserProfile(userProfile.userId, userProfile.accountType, userProfile.firstName, userProfile.lastName, userProfile.gender, userProfile.accountStatus, userProfile.avatar, userProfile.contactNumber, userProfile.title, userProfile.about, userProfile.skills, userProfile.reviews);
    }
}

