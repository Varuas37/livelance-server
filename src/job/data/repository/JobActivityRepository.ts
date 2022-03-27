import { Mongoose } from "mongoose";
import { UserProfileDocument, UserProfileSchema } from "../../../profile/data/models/UserProfileModel";
import UserProfile from "../../../profile/domain/UserProfile";
import { Job } from "../../domain/Job";
import IJobActivityRepository from "../../domain/JobActivity/IJobActivity";
import { JobActivity } from "../../domain/JobActivity/JobActivity";
import { JobActivityDocument, JobActivitySchema } from "../models/JobActivityModel";
import { JobDocument, JobModel, JobSchema } from "../models/JobModel";

export default class JobActivityRepository implements IJobActivityRepository {
    constructor(private readonly client: Mongoose) { }


    async find(id: string, userId: string): Promise<JobActivity> {
        // Registering job model so we can populate data. 
        this.client.model<JobDocument>(Job.modelName, JobSchema) as JobModel;
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        const result = await model.findById(id).populate("jobId");
        if (result === null) return Promise.reject('Job Activity not found')
        return new JobActivity(result.jobId, userId, result.status);
    }
    async findAllByStatus(status: string, userId: string): Promise<JobActivity[]> {
        // Registering job model so we can populate data. 
        this.client.model<JobDocument>(Job.modelName, JobSchema) as JobModel;
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        const results = model.find({ $and: [{ status: status }, { userId: userId }] }).populate("jobId");
        // await results.populate("profileId");

        return results;
    }

    async applyJob(id: string, userId: string): Promise<String> {
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        const modelProfile = this.client.model<UserProfileDocument>(UserProfile.modelName, UserProfileSchema);
        const profile = await modelProfile.findOne({ userId: userId })
        if (profile === null) return Promise.reject('User Profile Does not exist');
        const andFilter = {
            $and: [
                { jobId: id, },
                { userId: userId },
                { profileId: profile.id }
            ]
        }
        const update = { status: 'Applied' };
        const upsert = {
            new: true,
            upsert: true // Make this update into an upsert
        }
        await model.findOneAndUpdate(andFilter, update, upsert);
        return 'Applied';
    }
    async saveJob(id: string, userId: string): Promise<String> {
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        const modelProfile = this.client.model<UserProfileDocument>(UserProfile.modelName, UserProfileSchema);
        const profile = await modelProfile.findOne({ userId: userId })
        if (profile === null) return Promise.reject('User Profile Does not exist');
        const andFilter = {
            $and: [
                { jobId: id, },
                { userId: userId },
                { profileId: profile.id }
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
        const modelProfile = this.client.model<UserProfileDocument>(UserProfile.modelName, UserProfileSchema);
        const profile = await modelProfile.findOne({ userId: userId })
        if (profile === null) return Promise.reject('User Profile Does not exist');
        const andFilter = {
            $and: [
                { jobId: id, },
                { userId: userId },
                { profileId: profile.id }
            ]
        }
        const update = { status: 'Accepted' };
        const upsert = {
            new: true,
            upsert: true // Make this update into an upsert
        }
        await model.findOneAndUpdate(andFilter, update, upsert);
        return 'Accepted';
    }
    async offerOrDenyJob(id: string, status: string, userId: string): Promise<String> {
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        const modelProfile = this.client.model<UserProfileDocument>(UserProfile.modelName, UserProfileSchema);
        const profile = await modelProfile.findOne({ userId: userId })
        if (profile === null) return Promise.reject('User Profile Does not exist');
        const andFilter = {
            $and: [
                { jobId: id, },
                { userId: userId },
                { profileId: profile.id }
            ]
        }
        const update = { status: status };
        const upsert = {
            new: true,
            upsert: true // Make this update into an upsert
        }
        await model.findOneAndUpdate(andFilter, update, upsert);
        return status;
    }

    getJobActivities(): Promise<Job[]> {
        throw new Error("Method not implemented.");
    }

    async getCandidatesList(jobId: string): Promise<{ [propName: string]: any; }> {
        this.client.model<UserProfileDocument>(UserProfile.modelName, UserProfileSchema);
        const model = this.client.model<JobActivityDocument>(JobActivity.modelName, JobActivitySchema);
        const candidateList = await model.find({ status: 'Applied', jobId: jobId }).populate("profileId").exec();
        console.log(candidateList);
        return {
            candidates: candidateList
        };
    }
}

