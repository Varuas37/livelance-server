import * as mongoose from 'mongoose'
import User from '../../../auth/domain/User';
import UserProfile from '../../../profile/domain/UserProfile';
import { Job } from '../../domain/Job';

const enumStatus = {
    values: ["Saved", "Applied", "Viewed", "Accepted", "Denied", "Offered", "Archieve"],
    message: "Please specify the status of Job Activity. Accepted values are: Saved, Applied, Viewed, Accepted, Denied",
};

export interface JobActivityDocument extends mongoose.Document {
    jobId: string
    userId: string
    profileId: string
    status: string

}
export interface JobActivityModel extends mongoose.Model<JobActivityDocument> { }
const JobActivitySchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Job.modelName,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User.modelName,
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserProfile.modelName,
        },
        status: { type: String, required: true, enum: enumStatus, },
    }
)

export { JobActivitySchema }

