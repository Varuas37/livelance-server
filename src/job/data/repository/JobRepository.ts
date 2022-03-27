import { Mongoose } from 'mongoose'
import { UserProfileDocument, UserProfileSchema } from '../../../profile/data/models/UserProfileModel';

import UserProfile from '../../../profile/domain/UserProfile';
import IJobRepository from '../../domain/IJobRepository';
import { Job } from '../../domain/Job';
import { JobDocument, JobModel, JobSchema } from '../models/JobModel';



export default class JobRepository implements IJobRepository {
    constructor(private readonly client: Mongoose) { }

    async createJob(job: Job): Promise<Job> {
        const jobModel = this.client.model<JobDocument>(
            Job.modelName,
            JobSchema
        ) as JobModel

        const profileModel = this.client.model<UserProfileDocument>(UserProfile.modelName, UserProfileSchema);
        const profile = await profileModel.findOne({ userId: job.postedBy })

        const newJob = new jobModel({
            postedOn: job.postedOn,
            jobTitle: job.jobTitle,
            jobDescription: job.jobDescription,
            category: job.category,
            subCategory: job.subCategory,
            skills: job.skills,
            postedBy: profile.id,
            duration: job.duration,
            rate: job.rate,
            rateDuration: job.rateDuration,
            city: job.city,
            state: job.state,
            zipcode: job.zipcode,
        })
        await newJob.save()
        return newJob;
    }

    async delete(jobId: string): Promise<String> {
        const jobModel = this.client.model<JobDocument>(
            Job.modelName,
            JobSchema
        ) as JobModel
        const result = await jobModel.findById(jobId)
        if (result === null) return Promise.reject('Job not found')
        await result.remove();
        return jobId;
    }


    async findOne(id: string): Promise<Job> {
        const jobModel = this.client.model<JobDocument>(
            Job.modelName,
            JobSchema
        ) as JobModel
        const result = await jobModel.findById(id).populate("postedBy", "firstName lastName avatar ")
        if (result === null) return Promise.reject('Job not found')
        return new Job(
            result.postedOn,
            result.jobTitle,
            result.jobDescription,
            result.category,
            result.subCategory,
            result.skills,
            result.postedBy,
            result.duration,
            result.rate,
            result.rateDuration,
            result.city,
            result.state,
            result.zipcode,
        )
    }

    async getJobFeedForUser(skills: string[], category: string, subCategory: string): Promise<Job[]> {
        const jobModel = this.client.model<JobDocument>(
            Job.modelName,
            JobSchema
        ) as JobModel
        var jobs = jobModel.find({ skills: { $exists: true, $in: skills } }).populate("postedBy", "firstName lastName avatar ")
        return jobs;
    }

    async getListedJobs(userId: string): Promise<Job[]> {
        const jobModel = this.client.model<JobDocument>(
            Job.modelName,
            JobSchema
        ) as JobModel
        const jobs = jobModel.find({ postedBy: userId })
        return jobs;
    }

}