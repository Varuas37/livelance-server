export default class UserProfile {
    constructor(
        public readonly userId: string,
        public readonly accountType: string,
        public readonly firstName?: string,
        public readonly lastName?: string,
        public readonly gender?: string,
        public readonly accountStatus?: string,
        public readonly avatar?: string,
        public readonly coverImage?: string,
        public readonly contactNumber?: string,
        public readonly title?: string,
        public readonly about?: string,
        public readonly skills?: string[],
        public readonly reviews?: string[],
    ) { }
}