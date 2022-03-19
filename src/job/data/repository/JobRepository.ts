import { Mongoose } from 'mongoose'
import IJobRepository from '../../domain/IJobRepository';
import { Job } from '../../domain/Job';
import { JobDocument, JobModel, JobSchema } from '../models/JobModel';



export default class JobRepository implements IJobRepository {
    constructor(private readonly client: Mongoose) { }


    async createJob(job: Job): Promise<Job> {
        const jobModel = this.client.model<JobDocument>(
            'job',
            JobSchema
        ) as JobModel
        const newJob = new jobModel({
            postedOn: job.postedOn,
            jobTitle: job.jobTitle,
            jobDescription: job.jobDescription,
            category: job.category,
            subCategory: job.subCategory,
            skills: job.skills,
            postedBy: job.postedBy,
            duration: job.duration,
            rate: job.rate,
            rateDuration: job.rateDuration,
            location: job.location,
            zipcode: job.zipcode,
        })
        await newJob.save()
        return newJob;
    }

    async delete(jobId: string): Promise<String> {
        const jobModel = this.client.model<JobDocument>(
            'job',
            JobSchema
        ) as JobModel
        const result = await jobModel.findById(jobId)
        if (result === null) return Promise.reject('Job not found')
        await result.remove();
        return jobId;
    }


    async findOne(id: string): Promise<Job> {
        const jobModel = this.client.model<JobDocument>(
            'job',
            JobSchema
        ) as JobModel
        const result = await jobModel.findById(id)
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
            result.location,
            result.zipcode,
        )
    }

    async getJobFeedForUser(skills: string[], category: string, subCategory: string): Promise<Job[]> {
        const jobModel = this.client.model<JobDocument>(
            'job',
            JobSchema
        ) as JobModel
        var x = jobModel.find({ skills: { $exists: true, $in: skills } })
        console.log('🇾🇪 ' + x);
        return x;
    }
}