import { Job } from "../Job"
import { JobActivity } from "./JobActivity"

export default interface IJobActivityRepository {
    find(id: string, userId: string): Promise<JobActivity>
    findAllByStatus(status: string, userId: string): Promise<Array<JobActivity>>
    applyJob(id: string, userId: string): Promise<String>
    saveJob(id: string, userId: string): Promise<String>
    acceptJob(id: string, userId: string): Promise<String>
    offerOrDenyJob(id: string, status: string, userId: string): Promise<String>
    getJobActivities(userId: string): Promise<Array<Job>>
}