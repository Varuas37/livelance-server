import * as express from 'express';
import TokenValidator from "../../auth/helpers/TokenValidator";
import IMessageRepository from '../domain/ImessageRepository';
import MessageController from './MessageController';


export default class MessageRouter {
    public static configure(repository: IMessageRepository,
        tokenValidator: TokenValidator,
    ): express.Router {
        const router = express.Router();
        let controller = new MessageController(repository)
        
        router.get('/status',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.status(req, res)
        )

       /* router.post('/',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req, res) => controller.post(req, res)
        )
*/
        
        return router
    }
}