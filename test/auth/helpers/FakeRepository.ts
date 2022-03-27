import IAuthRepository from '../../../src/auth/domain/IAuthRepository';
import User from '../../../src/auth/domain/User';
export default class FakeRepository implements IAuthRepository {
    getUser(user: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    public users =
        [
            {
                id: '1',
                email: 'saurav@gmail.com',
                password: 'sauravPassword',
            },
            {
                id: '2',
                email: 'test@gmail.com',
                password: ''
            }
        ]

    public async find(email: string): Promise<User> {
        const user = this.users.find((x) => x.email === email);
        if (!user) throw Promise.reject('User not found')
        return new User(
            user?.id,
            user?.email,
            user?.password,
        );
    }
    public async add(email: string, passwordHash: string): Promise<string> {
        const max = 9999
        const min = 1000
        const id = (Math.floor(Math.random() * (+max - +min)) + min).toString();
        this.users.push({
            id: id,
            email: email,
            password: passwordHash,
        })
        return id;
    }

}