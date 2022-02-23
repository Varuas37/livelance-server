import * as express from 'express'
import TokenValidator from '../../auth/helpers/TokenValidator'
import { validate } from '../../auth/helpers/Validators'
import MongoCrudModel from '../data/model/MongoCrudModel'
import ICrudModelRepository from '../data/repository/ICrudModelRepository'
import CrudModelController from './CrudModelController'


export default class CrudRouter {
    public static configure(
        repository: ICrudModelRepository,
        tokenValidator: TokenValidator,
        crudModel: MongoCrudModel,
    ): express.Router {
        const router = express.Router()
        let controller = new CrudModelController(repository, crudModel)

        router.get(
            '/status',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.status(req, res)
        )
        router.post(
            '/',

            validate,
            (req: express.Request, res: express.Response, next: express.NextFunction) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response) => controller.createCrudModel(req, res)
        )
        router.get(
            '/:id',
            validate,
            (req: express.Request, res: express.Response, next: express.NextFunction) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response) => controller.getCrudModel(req, res)
        )
        router.get(
            '/',
            validate,
            (req: express.Request, res: express.Response, next: express.NextFunction) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response) => controller.getAllCrudModel(req, res)
        )
        router.patch(
            '/:id',
            validate,
            (req: express.Request, res: express.Response, next: express.NextFunction) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response) => controller.updateCrudModel(req, res)
        )
        router.delete(
            '/:id',
            validate,
            (req: express.Request, res: express.Response, next: express.NextFunction) => tokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response) => controller.deleteCrudModel(req, res)
        )
        return router
    }
}
