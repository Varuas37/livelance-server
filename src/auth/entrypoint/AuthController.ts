import * as express from 'express'
import IAuthRepository from '../domain/IAuthRepository'
import ITokenService from '../services/ITokenService'
import SignInUseCase from '../usecases/SignInUseCase'
import SignOutUseCase from '../usecases/SignOutUseCase'
import SignUpUseCase from '../usecases/SignUpUseCase'
import { UserSchema } from '../data/models/UserModel'
import AuthRepository from '../data/repository/AuthRepository'


export default class AuthController {
    private readonly signInUseCase: SignInUseCase
    private readonly signUpUseCase: SignUpUseCase
    private readonly signOutUseCase: SignOutUseCase
    private readonly tokenService: ITokenService
    private readonly repository: IAuthRepository
    //private readonly repository_1: AuthRepository

    constructor(
        signInUseCase: SignInUseCase,
        signupUseCase: SignUpUseCase,
        signoutUseCase: SignOutUseCase,
        tokenService: ITokenService,
        repository: IAuthRepository,
       // repository_1: AuthRepository
    ) {
        this.signInUseCase = signInUseCase
        this.tokenService = tokenService
        this.signUpUseCase = signupUseCase
        this.signOutUseCase = signoutUseCase
        this.repository = repository
        //this.repository_1 = repository_1
    }

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Auth endpoint is Running.' })
    }

    public async signin(req: express.Request, res: express.Response) {
        try {
            const { email, password } = req.body
            return this.signInUseCase
                .execute(email, password)
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
            const { email, password, accountType } = req.body
            return this.signUpUseCase
                .execute(email, password, accountType)
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

   // public async getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
   //     try {
  //        const users = await this.repository_1.getUser(req.user);
  //        return res.json(users);
 //       } catch (ex) {
 //         next(ex);
//        }
 //     };





      













}