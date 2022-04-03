import express from "express";
import IProfileRepository from "../../profile/domain/IProfileRepository";
import IJobRepository from "../domain/IJobRepository";
import { Job } from "../domain/Job";
import IJobActivityRepository from "../domain/JobActivity/IJobActivity";
import GenerateJobFeedUseCase from "../usecases/GenerateJobFeed";

export default class JobController {
	private readonly generateJobFeedUseCase: GenerateJobFeedUseCase;
	private readonly repository: IJobRepository;
	private readonly jobActivityRepository: IJobActivityRepository;

	constructor(
		repository: IJobRepository,
		jobActivityRepository: IJobActivityRepository,
		generateJobfeedUseCase: GenerateJobFeedUseCase
	) {
		this.repository = repository;
		this.jobActivityRepository = jobActivityRepository;
		this.generateJobFeedUseCase = generateJobfeedUseCase;
	}

	public async status(req: express.Request, res: express.Response) {
		return res.status(200).json({ message: "Job endpoint is running 💅" });
	}

	public async post(req: express.Request, res: express.Response) {
		try {
			const userID = req.user;
			const {
				postedOn,
				jobTitle,
				jobDescription,
				category,
				subCategory,
				skills,
				duration,
				rate,
				rateDuration,
				city,
				state,
				zipcode,
			} = req.body;
			const job = new Job(
				postedOn,
				jobTitle,
				jobDescription,
				category,
				subCategory,
				skills,
				userID,
				duration,
				rate,
				rateDuration,
				city,
				state,
				zipcode
			);
			return this.repository
				.createJob(job)
				.then((job) =>
					res.status(200).json({
						job: job,
					})
				)
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS: 💅" + err);
			return res.status(400).json({ error: err });
		}
	}

	public async findOne(req: express.Request, res: express.Response) {
		try {
			const { id } = req.params;
			return this.repository
				.findOne(id)
				.then((job) =>
					res.status(200).json({
						job: job,
					})
				)
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS: 💅" + err);
			return res.status(400).json({ error: err });
		}
	}

	public async delete(req: express.Request, res: express.Response) {
		try {
			const { id } = req.params;
			return this.repository
				.delete(id)
				.then((id) =>
					res.status(200).json({
						jobId: id,
					})
				)
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS: 💅" + err);
			return res.status(400).json({ error: err });
		}
	}
	public async getJobFeedForUser(req: express.Request, res: express.Response) {
		try {
			const { category, subCategory } = req.body;
			const userId = req.user;
			return this.generateJobFeedUseCase
				.execute(userId, category, subCategory)
				.then((jobs) =>
					res.status(200).json({
						jobs: jobs,
					})
				)
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS: 💅" + err);
			return res.status(400).json({ error: err });
		}
	}

	public async getListedJobs(req: express.Request, res: express.Response) {
		try {
			const userId = req.user;
			return this.repository
				.getListedJobs(userId)
				.then((listedJob) => {
					console.log(listedJob);
					res.status(200).json({
						jobs: listedJob,
					})
				}
				)
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS: 💅" + err);
			return res.status(400).json({ error: err });
		}
	}

	public async getListOfCandidates(
		req: express.Request,
		res: express.Response
	) {
		try {
			const { id } = req.params;
			return this.jobActivityRepository
				.getCandidatesList(id)
				.then((candidateList) => res.status(200).json(candidateList))
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS: 💅" + err);
			return res.status(400).json({ error: err });
		}
	}

	public async saveJob(req: express.Request, res: express.Response) {
		try {
			const { id } = req.params;
			return this.jobActivityRepository
				.saveJob(id, req.user)
				.then((result) =>
					res.status(200).json({
						status: result,
					})
				)
				.catch((err: Error) => {
					throw err;
				});
		} catch (err) {
			console.log("OOPS 💅" + err);
			return res.status(400).json({ error: err });
		}
	}

	public async applyJob(req: express.Request, res: express.Response) {
		try {
			const { id } = req.params;
			return this.jobActivityRepository
				.applyJob(id, req.user)
				.then((result) =>
					res.status(200).json({
						status: result,
					})
				)
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS 💅" + err);
			return res.status(400).json({ error: err });
		}
	}
	public async offerOrDenyJob(req: express.Request, res: express.Response) {
		try {
			const { status, profileId } = req.body;
			const { id } = req.params;
			return this.jobActivityRepository
				.offerOrDenyJob(id, status, profileId)
				.then((result) =>
					res.status(200).json({
						status: result,
					})
				)
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS 💅" + err);
			return res.status(400).json({ error: err });
		}
	}
	public async acceptJob(req: express.Request, res: express.Response) {
		try {
			const { id } = req.params;
			return this.jobActivityRepository
				.acceptJob(id, req.user)
				.then((result) =>
					res.status(200).json({
						status: result,
					})
				)
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS 💅" + err);
			return res.status(400).json({ error: err });
		}
	}
	public async findAllByStatus(req: express.Request, res: express.Response) {
		try {
			// uncomment below code in case of react frontend
			const { status } = JSON.parse(req.headers.data.toString());

			// uncomment below code in case of postman
			// const { status } = req.body;

			return this.jobActivityRepository
				.findAllByStatus(status, req.user)
				.then((result) =>
					res.status(200).json({
						status: result,
					})
				)
				.catch((err: Error) => res.status(404).json({ error: err }));
		} catch (err) {
			console.log("OOPS 💅" + err);
			return res.status(400).json({ error: err });
		}
	}
}

declare module "express-serve-static-core" {
	interface Request {
		user?: any;
	}
}
