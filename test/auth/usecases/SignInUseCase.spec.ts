import 'mocha'
import chai, { expect } from 'chai';
import SignInUseCase from '../../../src/auth/usecases/SignInUseCase';
import IAuthRepository from '../../../src/auth/domain/IAuthRepository';
import IPasswordService from '../../../src/auth/services/IPasswordService';
import { uuid } from 'uuidv4';

import FakeRepository from '../helpers/FakeRepository';
import FakePasswordService from '../helpers/FakePasswordService';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('SignInUseCase', () => {
    // System Under Test here is SignInUseCase
    let sut: SignInUseCase
    let repository: IAuthRepository
    let passwordService: IPasswordService
    const user = {
        id: '1',
        email: 'saurav@gmail.com',
        password: 'sauravPassword',
    }
    beforeEach(() => {
        repository = new FakeRepository()
        passwordService = new FakePasswordService()
        sut = new SignInUseCase(repository, passwordService);
    })

    it('should throw an error when user is not found', async () => {
        const wrongUser = { email: 'wrong@gmail.com', password: 'wrongPassword' }
        // Assert
        await expect(sut.execute(wrongUser.email, wrongUser.password)).to.be.rejectedWith('Invalid email or password')
    })

    it('should return userId when user is found', async () => {
        // Assert
        const userId = await sut.execute(user.email, user.password);
        expect(userId).to.be.equal(user.id);

    })
});