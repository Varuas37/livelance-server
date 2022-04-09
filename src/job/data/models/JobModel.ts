import * as mongoose from 'mongoose'
import UserProfile from '../../../profile/domain/UserProfile';

const enumRateDuration = {
    values: ["hour", "week", "project", "month",],
    message: "Please specify proper duration. Accepted values are: hour, week, project, month",
};
export interface JobDocument extends mongoose.Document {
    id: string
    postedOn: string,
    jobTitle: string
    jobDescription: string
    category: string
    subCategory: string
    skills: string[]
    postedBy: string
    duration: number
    rate: number
    rateDuration: string
    city: string
    state: string
    zipcode: number
}
export interface JobModel extends mongoose.Model<JobDocument> { }
const JobSchema = new mongoose.Schema(
    {
        jobTitle: { type: String, required: true },
        jobDescription: { type: String, required: true },
        category: { type: String, required: true },
        subCategory: { type: String, required: true },
        skills: { type: Array, required: true, },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserProfile.modelName,
        },
        duration: { type: String, required: true, },
        rate: { type: Number, required: true },
        rateDuration: { type: String, required: true, default: "hour", enum: enumRateDuration },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: Number, required: true },
    }
)
JobSchema.index({ jobDescription: "text", jobTitle: "text", category: "text", subCategory: "text", skills: "text" })
export { JobSchema }

