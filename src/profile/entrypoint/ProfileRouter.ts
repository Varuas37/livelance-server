import * as express from 'express';
import TokenValidator from "../../auth/helpers/TokenValidator";
import IProfileRepository from "../domain/IProfileRepository";
import ProfileController from './ProfileController';

export default class ProfileRouter {
    public static configure(repository: IProfileRepository,
        tokenValidator: TokenValidator,
    ): express.Router {
        const router = express.Router();
        let controller = new ProfileController(repository)

        router.get('/status',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.status(req, res)

        )
        return router
    }
}