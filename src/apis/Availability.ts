import Catalog from "./Catalog";
import Datacenter from "./Datacenter";
import _Availability from "./interfaces/Availability.interface";
import Plan from "./Plan";

export default class Availability
{
	constructor(private readonly catalog: Catalog, readonly data: _Availability) {}

	get datacenters(): Array<Datacenter>
	{
		return this.data.datacenters.map(datacenter => new Datacenter(datacenter));
	}

	get plan(): Plan
	{
		const plan: Plan | undefined = this.catalog.getPlans().find(plan => plan.data.planCode === this.data.planCode)
		if(!plan)
			throw new Error("Can't find plan "+this.data.planCode);

		return plan;
	}

	isAvailable(): boolean
	{
		return this.datacenters
			.map(datacenter => datacenter.hasProductAvailability())
			.reduce((prev, current) => (prev || current), false);
	}
}

export type Availabilities = Array<Availability>;