import * as mongoose from 'mongoose'

export interface JobModel extends mongoose.Document {
    id: string
    jobTitle: string
    jobDescription: string
    category: string
    subCategory: string
    skills: string[]
    postedBy: string
    duration: number
    rate: number
    location: string
    zipcode: number
}

export const JobSchema = new mongoose.Schema(
    {
        jobTitle: { type: String, required: true },
        jobDescription: { type: String, required: true },
        category: { type: String, required: true },
        subCategory: { type: String, required: true },
        skills: { type: Array, required: true, },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        duration: { type: String, required: true },
        rate: { type: Number, required: true },
        location: { type: String, required: true },
        zipcode: { type: Number, required: true },
    }
)