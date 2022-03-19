import * as mongoose from 'mongoose'

export interface UserProfileDocument extends mongoose.Document {
    id: string,
    userId: string,
    accountType: string,
    firstName?: string,
    lastName?: string,
    gender?: string,
    accountStatus?: string,
    avatar?: string,
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
        ref: "user",
    },
    accountType: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    gender: { type: String, required: false },
    accountStatus: { type: String, required: false },
    avatar: { type: String, required: false },
    contactNumber: { type: String, required: false },
    title: { type: String, required: false },
    about: { type: String, required: false },
    skills: { type: Array, required: false },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
    }],
})
export { UserProfileSchema }