import { Mongoose } from 'mongoose'
import {
    JobSchema,
    JobDocument,
    JobModel,
} from '../../../../src/job/data/models/JobModel'
import { Job } from '../../../../src/job/domain/Job'

export const prepareDb = async (client: Mongoose) => {
    const model = client.model<JobDocument>(
        Job.modelName,
        JobSchema
    ) as JobModel
    await model.ensureIndexes()
    const jobDocs = await model.insertMany(jobs)
    return jobDocs
}

export const cleanUpDb = async (client: Mongoose) => {
    await client.connection.db.dropCollection('jobactivities')
    await client.connection.db.dropCollection('job')
}

const jobs = [
    {
        postedOn: "March 21, 2022",
        jobTitle: "Software Developer",
        jobDescription: "needs to build software",
        category: "Software Development",
        subCategory: "Mobile Development",
        skills: [
            "nodejs",
            "reactjs",
            "html",
            "css"
        ],
        duration: "1 weeks",
        rate: "35",
        rateDuration: "hour",
        location: "3900 Old Omen RD",
        city: "kk",
        state: "TX",
        zipcode: "75701"
    },
    {
        postedOn: "March 22, 2022",
        jobTitle: "Teaching",
        jobDescription: "needs to teach",
        category: "Teaching",
        subCategory: "Mobile Development",
        skills: [
            "nodejs",
            "reactjs",
            "html",
            "css"
        ],
        duration: "1 weeks",
        rate: "35",
        rateDuration: "hour",
        location: "3900 Old Omen RD",
        city: "kk",
        state: "TX",
        zipcode: "75701"
    },
    {
        postedOn: "March 21, 2022",
        jobTitle: "Software Developer",
        jobDescription: "needs to build software",
        category: "Software Development",
        subCategory: "Mobile Development",
        skills: [
            "nodejs",
            "reactjs",
            "html",
            "css"
        ],
        duration: "1 weeks",
        rate: "35",
        rateDuration: "hour",
        location: "3900 Old Omen RD",
        city: "kk",
        state: "TX",
        zipcode: "75701"
    },
    {
        postedOn: "March 21, 2022",
        jobTitle: "Software Developer",
        jobDescription: "needs to build software",
        category: "Software Development",
        subCategory: "Mobile Development",
        skills: [
            "nodejs",
            "reactjs",
            "html",
            "css"
        ],
        duration: "3 weeks",
        rate: "35",
        rateDuration: "hour",
        location: "3900 Old Omen RD",
        city: "kk",
        state: "TX",
        zipcode: "75701"
    },
    {
        postedOn: "March 21, 2022",
        jobTitle: "Software Developer",
        jobDescription: "needs to build software",
        category: "Software Development",
        subCategory: "Mobile Development",
        skills: [
            "nodejs",
            "reactjs",
            "html",
            "css"
        ],
        duration: "2 months",
        rate: "35",
        rateDuration: "hour",
        location: "3900 Old Omen RD",
        city: "kk",
        state: "TX",
        zipcode: "75701"
    },
]

