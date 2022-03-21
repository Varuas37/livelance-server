export default class Reviews {
    constructor(
        public readonly postedOn: string,
        public readonly profileId: string,
        public readonly authorId: string,
        public readonly title: string,
        public readonly content: string,
        public readonly rating: number,
    ) { }
}




// data: {
//     id: "1",
//     average: 4,
//     totalCount: 1624,
//     counts: [
//         { rating: 5, count: 1019 },
//         { rating: 4, count: 162 },
//         { rating: 3, count: 97 },
//         { rating: 2, count: 199 },
//         { rating: 1, count: 147 },
//     ],
// },