import User from "./User";

export default interface IAuthRepository {
    find(email: string): Promise<User>;
    add(
        username: string,
        email: string,
        passwordHash?: string,

    ): Promise<string>;

    getUser(user: string): Promise<User>;
}