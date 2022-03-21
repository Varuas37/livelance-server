import * as mongoose from 'mongoose'
import User from '../../../auth/domain/User'
import UserProfile from '../../domain/UserProfile'

export interface ReviewDocument extends mongoose.Document {
    postedOn: string,
    profileId: string,
    authorId: string,
    title: string,
    content: string,
    rating: number,
}
export interface ReviewModel extends mongoose.Model<ReviewDocument> { }
const ReviewSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.modelName,
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserProfile.modelName,
    },
    postedOn: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },

})
export { ReviewSchema }