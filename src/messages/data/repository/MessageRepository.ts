import { Mongoose } from 'mongoose'
import IMessageRepository from '../../domain/ImessageRepository'




export default class MessageRepository implements IMessageRepository {
    constructor(private readonly client: Mongoose) { }
    sendMessage(user: string): Promise<string> {
        throw new Error('Method not implemented.')
    }
    getMessage(id: string): Promise<string> {
        throw new Error('Method not implemented.')
    }


    

    
}