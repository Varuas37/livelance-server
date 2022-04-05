import User from "./User";

export default interface IAuthRepository {
    find(email: string): Promise<User>;
    add(
        email: string,
        passwordHash?: string,
    ): Promise<string>;
    getUser(user: string): Promise<User>;
}