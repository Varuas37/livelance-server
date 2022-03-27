import dotenv from 'dotenv'
import faker from 'faker'
import mongoose from 'mongoose'

import {
    JobSchema,
    JobDocument,
    JobModel,
} from '../../../../src/job/data/models/JobModel'

const addFakeJobPostToDev = async () => {
    dotenv.config()
    const connectionStr = encodeURI(process.env.DEV_DB as string)
    let client = new mongoose.Mongoose()
    client.connect(connectionStr, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })

    const model = client.model<JobDocument>(
        'Job',
        JobSchema
    ) as JobModel
    await model.ensureIndexes()
    console.log(jobs())
    const jobDocs = await model.insertMany(jobs())
    return
}

function jobs() {
    return Array(10)
        .fill(10)
        .map((_, idx) => {
            const category = ["Software Engineer", "Teaching"];
            const subCategory = ["nodejs", "reactjs", "webdevelopment", "html", "css", "moving", "electrician", "teaching"];
            const rateDuration = ["hour", "week", "project"]

            const state = faker.address.state();
            return {
                postedOn: faker.date,
                jobTitle: faker.company.companyName,
                jobDescription: faker.random.words,
                category: category[faker.random.number({ min: 0, max: 2 })],
                subCategory: subCategory[faker.random.number({ min: 0, max: subCategory.length - 1 })],
                skills: [],
                postedBy: [],
                duration: "3 weeks",
                rate: faker.random.number({ min: 10, max: 300 }),
                rateDuration: rateDuration[faker.random.number({ min: 0, max: 2 })],
                location: faker.address.streetName(),
                city: faker.address.city(),
                state: state,
                zipcode: faker.address.zipCodeByState(state),

            }
        })
}

addFakeJobPostToDev()

// display_img_url: `https://picsum.photos/id/${imgids[faker.random.number({ min: 0, max: 3 })]
                //     }/300`,