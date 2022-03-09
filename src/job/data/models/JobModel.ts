import * as mongoose from 'mongoose'

export interface JobModel extends mongoose.Document {
    id: string
    title: string
    description: string
}

export const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
    }
)