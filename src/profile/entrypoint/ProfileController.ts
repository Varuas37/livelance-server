import express from 'express';
import IProfileRepository from "../domain/IProfileRepository";
import UserProfile from '../domain/UserProfile';

export default class ProfileController {
    constructor(private readonly repository: IProfileRepository) { };

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Profile endpoint is running 💅' })
    }


    public async find(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            return this.repository.getProfile(id)
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

    public async getProfilesByCategory(req: express.Request, res: express.Response) {
        try {
            const { categories } = req.body
            return this.repository.getProfilesByCategory(categories)
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
    public async getCurrentUser(req: express.Request, res: express.Response) {
        try {
            const userId = req.user

            return this.repository.findByUserId(userId)
                .then((profile) =>
                    res.status(200).json({
                        profile: profile,
                        authorized: true,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }
    public async update(req: express.Request, res: express.Response) {
        try {
            const userId = req.user
            const { accountType, firstName, lastName, gender, accountStatus, avatar, coverImage, contactNumber, title, about, skills, reviews, city, state, zipcode, categories, subCategories } = req.body
            const userProfile = new UserProfile(userId, accountType, firstName, lastName, gender, accountStatus, avatar, coverImage, contactNumber, title, about, skills, reviews, city, state, zipcode, categories, subCategories);
            return this.repository.update(userProfile)
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