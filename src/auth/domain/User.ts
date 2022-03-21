export default class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
    ) { }

    static modelName = "user"
}