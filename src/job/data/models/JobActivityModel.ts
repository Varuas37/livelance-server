import * as mongoose from 'mongoose'

const enumStatus = {
    values: ["Saved", "Applied", "Viewed", "Accepted", "Denied", "Offered"],
    message: "Please specify the status of Job Activity. Accepted values are: Saved, Applied, Viewed, Accepted, Denied",
};

export interface JobActivityDocument extends mongoose.Document {
    jobId: string
    userId: string
    status: string
}
export interface JobActivityModel extends mongoose.Model<JobActivityDocument> { }
const JobActivitySchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "job",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        status: { type: String, required: true, enum: enumStatus, },
    }
)

export { JobActivitySchema }

