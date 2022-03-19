import { Mongoose } from 'mongoose'
import IAuthRepository from '../../domain/IAuthRepository'
import User from '../../domain/User'
import { UserModel, UserSchema } from './../models/UserModel'

export default class AuthRepository implements IAuthRepository {
    constructor(private readonly client: Mongoose) { }

    public async find(email: string): Promise<User> {
        const users = this.client.model<UserModel>('User', UserSchema)
        const user = await users.findOne({ email: email.toLowerCase() })
        if (!user) return Promise.reject('User not found')
        return new User(
            user.id,
            user.email,
            user.password ?? '',
        );
    }
    public async add(
        email: string,
        passwordHash?: string
    ): Promise<string> {
        const userModel = this.client.model<UserModel>('User', UserSchema)
        const savedUser = new userModel({
            email: email.toLowerCase(),
        })

        if (passwordHash) savedUser.password = passwordHash
        console.log('👀' + savedUser);
        await savedUser.save()

        return savedUser.id
    }

    public async getUser(userId: string): Promise<User> {
        const userModel = this.client.model<UserModel>('User', UserSchema)
        const user = await userModel.findById(userId);
        if (user === null) return Promise.reject('User not found')
        return new User(
            user.id,
            user.email,
            '',
        )
    }
}