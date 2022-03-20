import express from 'express';
import IProfileRepository from "../domain/IProfileRepository";

export default class ProfileController {
    constructor(private readonly repository: IProfileRepository) { };

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Profile endpoint is running 💅' })
    }


    public async find(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            return this.repository.find(id)
                .then((profile) =>
                    res.status(200).json({
                        profile: profile,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: any
    }
}