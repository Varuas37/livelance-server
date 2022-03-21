import * as mongoose from 'mongoose'
import User from '../../../auth/domain/User'
import Reviews from '../../domain/Review'

export interface UserProfileDocument extends mongoose.Document {
    id: string,
    userId: string,
    accountType: string,
    firstName?: string,
    lastName?: string,
    gender?: string,
    accountStatus?: string,
    avatar?: string,
    coverImage?: string,
    contactNumber?: string,
    title?: string,
    about?: string,
    skills?: string[],
    reviews?: string[],
}
export interface UserProfileModel extends mongoose.Model<UserProfileDocument> { }
const UserProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.modelName,
    },
    accountType: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    gender: { type: String, required: false },
    accountStatus: { type: String, required: false },
    avatar: { type: String, required: false },
    coverImage: { type: String, required: false },
    contactNumber: { type: String, required: false },
    title: { type: String, required: false },
    about: { type: String, required: false },
    skills: [{ type: String, required: false }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Reviews.modelName,
    }],
})
export { UserProfileSchema }