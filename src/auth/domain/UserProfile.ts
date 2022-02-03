export default class UserProfile {
    constructor(
        public readonly userId: string,
        public readonly gender: string,
        public readonly accountType: string,
        public readonly accountStatus: string,
        public readonly avatar: string,
        public readonly contactNumber: string,
        public readonly educationId: string,
        public readonly experienceId: string,
        public readonly skillsId: string,
    ) { }
}