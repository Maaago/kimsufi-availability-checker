import { SimpleIntervalJob, Task, ToadScheduler } from "toad-scheduler";
import OvhEcoApis from "./apis/OvhEcoApis";
import Telegram from "./Telegram";

export default class App
{
	scheduler: ToadScheduler;
	job: SimpleIntervalJob;
	telegram: Telegram;

	constructor()
	{
		this.scheduler = new ToadScheduler();

		const task = new Task('Availabilities check', this.checkAvailabilities.bind(this));

		const minutes = Number(Bun.env.INTERVAL ?? 15);
		this.job = new SimpleIntervalJob({ minutes }, task);

		this.telegram = new Telegram();

		console.log("Backend started!");
	}

	start(): void
	{
		this.scheduler.addSimpleIntervalJob(this.job);
	}

	stop(): void
	{
		this.scheduler.stop();
	}

	checkAvailabilities(): void
	{
		OvhEcoApis.getCatalog()
		// .then(data => data.getKimsufiServers())
		// .then(async ps => await Promise.all(ps.map(async p => ({ name: p.data.name, iname: p.plans[0].invoiceName, available: await p.isAvailable() }))))
		// .then(ps => Promise.all(ps))
		// .then(ps => ps.sort((a, b) => a.name.localeCompare(b.name)))
		// .then(data => data.getPlans().filter(plan => plan.isActive()))
		// .then(ps => ps.filter(p => p.data.planCode.includes("game")).map(p => [ p.data.product, p.data.blobs ]))
		.then(catalog => catalog.getProduct("24ska01"))
		.then(product => ({ product, plan: product.plans.find(plan => plan.planCode === "24ska01") ?? product.plans[0] }))
		.then(async ({ product, plan }) => ({ name: plan.invoiceName, available: await product.isAvailable(plan) }))
		.then(({ name, available }) =>
		{
			if(available)
				this.telegram.sendMessage("Good news! Kimsufi's product "+name+" is available right now!");
			else
				console.log("So am I still waiting...");
		})
		.catch(e => console.error(e.message, e.stack));
	}
}
