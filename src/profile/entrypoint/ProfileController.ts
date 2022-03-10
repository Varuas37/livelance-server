import express from 'express';
import IProfileRepository from "../domain/IProfileRepository";

export default class ProfileController {
    constructor(private readonly repository: IProfileRepository) { };

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Profile endpoint is running 💅' })
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: any
    }
}