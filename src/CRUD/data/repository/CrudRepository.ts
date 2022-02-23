import { Mongoose } from 'mongoose'
import Pageable from '../../core/Pageable'


import MongoCrudModel from '../model/MongoCrudModel'

import ICrudModelRepository from './ICrudModelRepository'

export default class CrudRepository implements ICrudModelRepository {
    constructor(private readonly client: Mongoose) { }
    async findAll(page: number, pageSize: number): Promise<Pageable<MongoCrudModel>> {
        throw new Error('Method not implemented.')
    }
    async findOne(id: string): Promise<MongoCrudModel> {
        throw new Error('Method not implemented.')
    }
    async createModel(mongoCrudModel: MongoCrudModel): Promise<MongoCrudModel> {
        const crudModel = this.client.model<MongoCrudModel>(mongoCrudModel.getModelName(), mongoCrudModel.getModelSchema())
        const savedCrudModel = new crudModel(mongoCrudModel);
        await savedCrudModel.save()
        return savedCrudModel
    }

    async updateModel(mongoCrudModel: MongoCrudModel): Promise<MongoCrudModel> {
        throw new Error('Method not implemented.')
    }
    async deleteModel(mongoCrudModelId: string): Promise<MongoCrudModel> {
        throw new Error('Method not implemented.')
    }



    // public async find(email: string): Promise<User> {
    //     const users = this.client.model<UserModel>('User', UserSchema)
    //     const user = await users.findOne({ email: email.toLowerCase() })
    //     if (!user) return Promise.reject('User not found')
    //     return new User(
    //         user.id,
    //         user.username,
    //         user.email,
    //         user.password ?? '',
    //     );
    // }

    // public async add(
    //     username: string,
    //     email: string,
    //     passwordHash?: string
    // ): Promise<string> {
    //     const userModel = this.client.model<UserModel>('User', UserSchema)
    //     const savedUser = new userModel({
    //         username: username,
    //         email: email.toLowerCase(),
    //     })
    //     if (passwordHash) savedUser.password = passwordHash
    //     await savedUser.save()
    //     return savedUser.id
    // }

    // public async getUser(userId: string): Promise<User> {
    //     const userModel = this.client.model<UserModel>('User', UserSchema)
    //     const user = await userModel.findById(userId);
    //     if (user === null) return Promise.reject('User not found')
    //     return new User(
    //         user.id,
    //         user.username,
    //         user.email,
    //         '',
    //     )
    // }
}