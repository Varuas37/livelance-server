import IProfileRepository from '../../profile/domain/IProfileRepository'
import UserProfile from '../../profile/domain/UserProfile'
import IAuthRepository from '../domain/IAuthRepository'
import IPasswordService from '../services/IPasswordService'

export default class SignUpUseCase {
    constructor(
        private authRespository: IAuthRepository,
        private userProfileRepository: IProfileRepository,
        private passwordService: IPasswordService
    ) { }
    public async execute(
        email: string,
        password: string,
        accountType: string,
    ): Promise<string> {
        const user = await this.authRespository.find(email).catch((_) => null)
        if (user) return Promise.reject('User already exists')
        let passwordhash
        if (password) {
            passwordhash = await this.passwordService.hash(password)
        } else {
            passwordhash = undefined
        }
        const userId = await this.authRespository.add(
            email,
            passwordhash
        )
        const userProfile = new UserProfile(userId, accountType);
        const profile = await this.userProfileRepository.add(userProfile);
        if (profile) {
            return userId
        }
        else {
            throw 'Error Creating User Profile.'
        }
    }
}
