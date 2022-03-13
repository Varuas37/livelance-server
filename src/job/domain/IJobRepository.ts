import { Job } from "./Job"

export default interface IJobRepository {
    createJob(job: Job): Promise<Job>
    findOne(id: string): Promise<Job>
    delete(jobId: string): Promise<String>
    getJobFeedForUser(skills: string[], category: string, subCategory: string): Promise<Array<Job>>

}