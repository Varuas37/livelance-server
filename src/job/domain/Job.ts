

export class Job {
    constructor(
        public readonly postedOn: string,
        public readonly jobTitle: string,
        public readonly jobDescription: string,
        public readonly category: string,
        public readonly subCategory: string,
        public readonly skills: Array<String>,
        public readonly postedBy: string,
        public readonly duration: number,
        public readonly rate: number,
        public readonly rateDuration: string,
        public readonly location: string,
        public readonly zipcode: number,
    ) {
    }
}
