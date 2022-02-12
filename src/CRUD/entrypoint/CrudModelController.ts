import express from "express";
import { model } from "mongoose";
import MongoCrudModel from "../data/model/MongoCrudModel";
import ICrudModelRepository from "../data/repository/I_Repository";
import CrudModel from "../domain/CrudModel";

export default class CrudModelController {
    constructor(private readonly repository: ICrudModelRepository, private readonly crudModel: MongoCrudModel) { }

    public async status(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Shopping List endpoint is Running 💅' })
    }



    public async createCrudModel(req: express.Request, res: express.Response) {
        try {
            const { name, createdBy, description, kitchenId } = req.body

            const model = this.crudModel.createModel(req);
            return this.repository
                .createModel(model)
                .then((shoppingList) =>
                    res.status(200).json({
                        shoppingList: shoppingList,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async getCrudModel(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params

            return this.repository
                .findOne(id)
                .then((shoppingList) =>
                    res.status(200).json({
                        shoppingList: shoppingList,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async getAllCrudModel(req: express.Request, res: express.Response) {
        try {
            const { page, limit } = { ...req.query } as { page: any; limit: any }

            return this.repository
                .findAll(parseInt(page), parseInt(limit))
                .then((pageable) =>
                    res.status(200).json({
                        metadata: {
                            page: pageable.page,
                            pageSize: pageable.pageSize,
                            total_pages: pageable.totalPages,
                        },
                        shoppingList: pageable.data,
                    })
                )
                .catch((err: Error) => res.status(404).json({ error: err }))
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    public async updateCrudModel(req: express.Request, res: express.Response) {
        return res.status(200).json({ message: 'Update Crud Model Route 💅' })
    }

    public async deleteCrudModel(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params

            return this.repository
                .deleteModel(id)
                .then((shoppingList) =>
                    res.status(200).json({
                        shoppingList: shoppingList,
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