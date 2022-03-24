import * as express from 'express';
import TokenValidator from "../../auth/helpers/TokenValidator";
import IProfileRepository from "../domain/IProfileRepository";
import { getProfilesByCategoryValidation, validate } from '../helpers/Validators';
import ProfileController from './ProfileController';

export default class ProfileRouter {
    public static configure(repository: IProfileRepository,
        tokenValidator: TokenValidator,
    ): express.Router {
        const router = express.Router();
        let controller = new ProfileController(repository)

        router.get('/status',
            (req: express.Request, res: express.Response, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.status(req, res)

        )
        router.get('/current',
            (req: express.Request, res: express.Response, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.getCurrentUser(req, res)
        )

        router.get('/category',
            getProfilesByCategoryValidation(),
            validate,
            (req: express.Request, res: express.Response, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.getProfilesByCategory(req, res)
        )

        router.get('/:id',
            (req: express.Request, res: express.Response, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.find(req, res)
        )

        router.put('/',
            (req: express.Request, res: express.Response, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.update(req, res)
        )
        return router
    }
}