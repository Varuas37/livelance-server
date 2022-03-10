import * as mongoose from 'mongoose'

export interface UserProfileModel extends mongoose.Document {
    userId: string,
    gender?: string,
    accountType?: string,
    accountStatus?: string,
    avatar?: string,
    contactNumber?: string,
    educationId?: string,
    experienceId?: string,
    skillsId?: string,
}

export const UserProfileSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    accountStatus: { type: String, required: false },
    accountType: { type: String, required: false },
    gender: { type: String, required: false },
    avatar: { type: String, required: false },
    contactNumber: { type: String, required: false },
    educationId: { type: String, required: false },
    experienceId: { type: String, required: false },
    skillsId: { type: String, required: false },
})