export class JobActivity {
    constructor(
        public readonly jobId: string,
        public readonly userId: string,
        public readonly status: string,
    ) {
    }
    static modelName = "jobActivity"
}
