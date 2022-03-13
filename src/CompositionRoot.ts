import mongoose from 'mongoose'
import redis from 'redis'
import AuthRepository from './auth/data/repository/AuthRepository'
import BcryptPasswordService from './auth/data/services/BcryptPasswordService'
import JwtTokenService from './auth/data/services/JwtTokenService'
import RedisTokenStore from './auth/data/services/RedisTokenStore'
import AuthRouter from './auth/entrypoint/AuthRouter'
import TokenValidator from './auth/helpers/TokenValidator'

import { JobModel } from './job/data/models/JobModel'
import JobRepository from './job/data/repository/JobRepository'
import JobRouter from './job/entrypoint/JobRouter'
import ProfileRepository from './profile/data/repository/ProfileRepository'
import ProfileRouter from './profile/entrypoint/ProfileRouter'

export default class CompositionRoot {
    private static client: mongoose.Mongoose
    private static redisClient: redis.RedisClient

    public static configure() {
        this.client = new mongoose.Mongoose()
        this.redisClient = redis.createClient()

        const connectionStr = encodeURI(process.env.DEV_DB as string)
        this.client.connect(connectionStr, {
            // TODO add these things.
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }

    public static authRouter() {
        const repository = new AuthRepository(this.client)
        const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string)
        const passwordService = new BcryptPasswordService()
        const tokenStore = new RedisTokenStore(this.redisClient)
        const tokenValidator = new TokenValidator(tokenService, tokenStore)


        return AuthRouter.configure(
            repository,
            tokenService,
            tokenStore,
            passwordService,
            tokenValidator,
        )
    }

    public static profileRouter() {
        const repository = new ProfileRepository(this.client)
        const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string)
        const tokenStore = new RedisTokenStore(this.redisClient)
        const tokenValidator = new TokenValidator(tokenService, tokenStore)
        return ProfileRouter.configure(repository, tokenValidator);
    }

    public static jobRouter() {
        const repository = new JobRepository(this.client)
        const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string)
        const tokenStore = new RedisTokenStore(this.redisClient)
        const tokenValidator = new TokenValidator(tokenService, tokenStore)
        return JobRouter.configure(repository, tokenValidator)
    }







}