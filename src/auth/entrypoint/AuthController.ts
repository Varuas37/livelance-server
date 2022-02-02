import * as express from 'express'
import IAuthRepository from '../domain/IAuthRepository'
import ITokenService from '../services/ITokenService'
import SignInUseCase from '../usecases/SignInUseCase'
import SignOutUseCase from '../usecases/SignOutUseCase'
import SignUpUseCase from '../usecases/SignUpUseCase'


export default class AuthController {
    private readonly signInUseCase: SignInUseCase
    private readonly signUpUseCase: SignUpUseCase
    private readonly signOutUseCase: SignOutUseCase
    private readonly tokenService: ITokenService
    private readonly repository: IAuthRepository

    constructor(
        signInUseCase: SignInUseCase,
        signupUseCase: SignUpUseCase,
        signoutUseCase: SignOutUseCase,
        tokenService: ITokenService,
        repository: IAuthRepository
    ) {
        this.signInUseCase = signInUseCase
        this.tokenService = tokenService
        this.signUpUseCase = signupUseCase
        this.signOutUseCase = signoutUseCase
        this.repository = repository
    }

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Auth endpoint is Running.' })
    }

    public async signin(req: express.Request, res: express.Response) {
        try {
            const { username, email, password } = req.body
            return this.signInUseCase
                .execute(username, email, password)
                .then((id: string) =>
                    res.status(200).json({ auth_token: this.tokenService.encode(id) })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async signup(req: express.Request, res: express.Response) {
        try {
            const { username, email, password } = req.body
            return this.signUpUseCase
                .execute(username, email, password)
                .then((id: string) => {

                    res.status(200).json({ auth_token: this.tokenService.encode(id) })
                }
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async signout(req: express.Request, res: express.Response) {
        try {
            const token = req.headers.authorization!
            return this.signOutUseCase
                .execute(token)
                .then((result) => res.status(200).json({ message: result }))
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async getUser(req: express.Request, res: express.Response) {
        try {
            return this.repository.getUser(req.user)
                .then((result) => res.status(200).json({ user: result }))
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }
}