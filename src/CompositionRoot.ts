import mongoose from 'mongoose'
import redis from 'redis'
import AuthRepository from './auth/data/repository/AuthRepository'
import BcryptPasswordService from './auth/data/services/BcryptPasswordService'
import JwtTokenService from './auth/data/services/JwtTokenService'
import RedisTokenStore from './auth/data/services/RedisTokenStore'
import AuthRouter from './auth/entrypoint/AuthRouter'
import TokenValidator from './auth/helpers/TokenValidator'
import ITokenService from './auth/services/ITokenService'
import ITokenStore from './auth/services/ITokenStore'

import { JobModel } from './job/data/models/JobModel'
import JobRepository from './job/data/repository/JobRepository'
import JobRouter from './job/entrypoint/JobRouter'
import MessageRepository from './messages/data/repository/MessageRepository'
import MessageRouter from './messages/entrypoint/MessageRouter'
import ProfileRepository from './profile/data/repository/ProfileRepository'
import ProfileRouter from './profile/entrypoint/ProfileRouter'

export default class CompositionRoot {
    private static client: mongoose.Mongoose
    private static redisClient: redis.RedisClient
    private static tokenService: ITokenService
    private static tokenStore: ITokenStore

    public static configure() {
        this.client = new mongoose.Mongoose()
        this.redisClient = redis.createClient()
        this.tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string)
        this.tokenStore = new RedisTokenStore(this.redisClient)
        const connectionStr = encodeURI(process.env.DEV_DB as string)
        this.client.connect(connectionStr, {
            // TODO add these things.
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }

    public static authRouter() {
        const repository = new AuthRepository(this.client)
        const profileRepository = new ProfileRepository(this.client)
        const passwordService = new BcryptPasswordService()
        const tokenValidator = new TokenValidator(this.tokenService, this.tokenStore)

        return AuthRouter.configure(
            repository,
            profileRepository,
            this.tokenService,
            this.tokenStore,
            passwordService,
            tokenValidator,
        )
    }

    public static profileRouter() {
        const repository = new ProfileRepository(this.client)
        const tokenValidator = new TokenValidator(this.tokenService, this.tokenStore)
        return ProfileRouter.configure(repository, tokenValidator);
    }

    public static jobRouter() {
        const jobRepository = new JobRepository(this.client)
        const profileRepository = new ProfileRepository(this.client)
        const tokenValidator = new TokenValidator(this.tokenService, this.tokenStore)
        return JobRouter.configure(jobRepository, profileRepository, tokenValidator)
    }

    public static messageRouter() {
        const repository = new MessageRepository(this.client)
        const tokenValidator = new TokenValidator(this.tokenService, this.tokenStore)
        return MessageRouter.configure(repository, tokenValidator);
    }






}