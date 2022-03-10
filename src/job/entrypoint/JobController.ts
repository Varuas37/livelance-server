import express from 'express';
import IJobRepository from '../data/repository/IJobRepository';


export default class JobController {
    constructor(private readonly repository: IJobRepository) { };

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Job endpoint is running 💅' })
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: any
    }
}