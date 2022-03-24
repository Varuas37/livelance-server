import IProfileRepository from '../../profile/domain/IProfileRepository'
import UserProfile from '../../profile/domain/UserProfile'
import IJobRepository from '../domain/IJobRepository'
import { Job } from '../domain/Job'


export default class GenerateJobFeedUseCase {
    constructor(
        private jobRepository: IJobRepository,
        private userProfileRepository: IProfileRepository,
    ) { }
    public async execute(
        userId: string,
        category: string,
        subCategory: string,
    ): Promise<Array<Job>> {
        try {
            const userProfile = await this.userProfileRepository.findByUserId(userId)
            const feed = await this.jobRepository.getJobFeedForUser(userProfile.skills, category, subCategory);
            return feed;
        } catch (err) {
            console.log('💅' + err);
            return Promise.reject('User Profile Does Not Exist')
        }


    }
}
