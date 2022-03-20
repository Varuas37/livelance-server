import { Mongoose } from "mongoose";
import { Job } from "../../domain/Job";
import IJobActivityRepository from "../../domain/JobActivity/IJobActivity";
import { JobActivity } from "../../domain/JobActivity/JobActivity";
import { JobActivityDocument, JobActivitySchema } from "../models/JobActivityModel";

export default class JobActivityRepository implements IJobActivityRepository {
    constructor(private readonly client: Mongoose) { }

    async find(id: string, userId: string): Promise<JobActivity> {
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        const result = await model.findById(id)
        if (result === null) return Promise.reject('Job Activity not found')
        return new JobActivity(result.jobId, userId, result.status);
    }
    async findAllByStatus(status: string, userId: string): Promise<JobActivity[]> {
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        const results = model.find({ status: status });
        return results;
    }

    async applyJob(id: string, userId: string): Promise<String> {
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        await model.replaceOne({ "status": "Applied" }, { "jobId": id, "userId": userId, "status": "Applied" }, { upsert: true });
        return 'Applied';
    }
    async saveJob(id: string, userId: string): Promise<String> {
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        const andFilter = {
            $and: [
                { jobId: id, },
                { userId: userId }
            ]
        }
        const update = { status: 'Saved' };
        const upsert = {
            new: true,
            upsert: true // Make this update into an upsert
        }
        await model.findOneAndUpdate(andFilter, update, upsert);
        return 'Saved';
    }
    async acceptJob(id: string, userId: string): Promise<String> {
        // TODO: Add further security. Check if the job has actually been offered first. For this, the job Status first needs to be Offered.
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        await model.replaceOne({ "status": "Applied" }, { "jobId": id, "userId": userId, "status": "Accepted" }, { upsert: true });
        return 'Accepted';
    }
    async offerOrDenyJob(id: string, status: string, userId: string): Promise<String> {
        // TODO: Add further security. Only the person who posted a job can change this stauts. Also, the logic needs to be different. 
        // TODO: Find the user first, the id here will be the user id, and then go to that user's user activity for the jobId and then change the status. 
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        await model.replaceOne({ "status": status }, { "jobId": id, "userId": userId, "status": status }, { upsert: true });
        return status;
    }

    getJobActivities(): Promise<Job[]> {
        throw new Error("Method not implemented.");
    }

}