import IAuthRepository from '../domain/IAuthRepository'
import IPasswordService from '../services/IPasswordService'

export default class SignInUseCase {
    constructor(
        private authRepository: IAuthRepository,
        private passwordService: IPasswordService
    ) { }
    public async execute(
        username: string,
        email: string,
        password: string,

    ): Promise<string> {
        return this.emailLogin(email, password)
    }

    private async emailLogin(email: string, password: string) {
        const user = await this.authRepository.find(email).catch((_) => null)
        if (!user || !(await this.passwordService.compare(password, user.password)))
            return Promise.reject('Invalid email or password')
        return user.id
    }
}