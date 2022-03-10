import { Mongoose } from 'mongoose'
import IJobRepository from '../../domain/IJobRepository';



export default class JobRepository implements IJobRepository {
    constructor(private readonly client: Mongoose) { }

}