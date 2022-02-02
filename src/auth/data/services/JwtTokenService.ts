import jwt from 'jsonwebtoken'
import ITokenService from '../../services/ITokenService'

export default class JwtTokenService implements ITokenService {
    constructor(private readonly privateKey: string) { }

    encode(payload: string | object): string | object {

        let token = jwt.sign({ data: payload }, this.privateKey, {
            issuer: 'com.kitchenApp',
            expiresIn: '1y',
            algorithm: 'HS256',
        })

        return token
    }
    decode(token: string): string | object {
        console.log(token)
        try {
            const decoded = jwt.verify(token, this.privateKey)
            return decoded
        } catch (err) {
            return 'Cannot Decode Value'
        }
    }
}