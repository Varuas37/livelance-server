import * as express from 'express'
import IProfileRepository from '../../profile/domain/IProfileRepository'
import IAuthRepository from '../domain/IAuthRepository'
import TokenValidator from '../helpers/TokenValidator'
import {
    signinValidationRules,
    signupValidationRules,
} from '../helpers/Validators'
import IPasswordService from '../services/IPasswordService'
import ITokenService from '../services/ITokenService'
import ITokenStore from '../services/ITokenStore'
import SignInUseCase from '../usecases/SignInUseCase'
import SignOutUseCase from '../usecases/SignOutUseCase'
import SignUpUseCase from '../usecases/SignUpUseCase'


import { validate } from './../helpers/Validators'
import AuthController from './AuthController'
import getAllUsers from './userController'

import AuthRepository from '../data/repository/AuthRepository'

export default class AuthRouter {
    public static configure(
        authRepository: IAuthRepository,
        userProfileRepository: IProfileRepository,
        tokenService: ITokenService,
        tokenStore: ITokenStore,
        passwordService: IPasswordService,
        tokenValidator: TokenValidator,
       // repository_1: AuthRepository

    ): express.Router {
        const router = express.Router()
        let controller = AuthRouter.composeController(
            authRepository,
            userProfileRepository,
            tokenService,
            tokenStore,
            passwordService,
          //  repository_1
        )
        router.get(
            '/',
            (req: express.Request, res: express.Response) =>
                controller.status(req, res)
        )

        router.post(
            '/signin',
            signinValidationRules(),
            validate,
            (req: express.Request, res: express.Response) =>
                controller.signin(req, res)
        )
        router.post(
            '/signup',
            signupValidationRules(),
            validate,
            (req: express.Request, res: express.Response) =>
                controller.signup(req, res)
        )

        router.post(
            '/signout',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response) =>
                controller.signout(req, res)
        )

        router.get(
            '/user',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response) =>
                controller.getUser(req, res)
        )


        return router
    }

    private static composeController(
       // authRepository_1: AuthRepository,
        authRepository: IAuthRepository,
        userProfileRepository: IProfileRepository,
        tokenService: ITokenService,
        tokenStore: ITokenStore,
        passwordService: IPasswordService
    ): AuthController {
        const signinUseCase = new SignInUseCase(authRepository, passwordService)
        const signupUseCase = new SignUpUseCase(authRepository, userProfileRepository, passwordService)
        const signoutUseCase = new SignOutUseCase(tokenStore)
        const controller = new AuthController(
            signinUseCase,
            signupUseCase,
            signoutUseCase,
            tokenService,
            authRepository,
          //  authRepository_1
        )
        return controller
    }
}