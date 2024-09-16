import _Availability from "./interfaces/Availability.interface";
import Availability, { Availabilities } from "./Availability";
import Catalog from "./Catalog";
import Plan from "./interfaces/Plan.interface";
import _Product from "./interfaces/Product.interface"
import OvhEcoApis from "./OvhEcoApis"

export default class Product
{
	constructor(readonly catalog: Catalog, readonly data: _Product) {}

	get plans() : Array<Plan>
	{
		return this.catalog.data.plans.filter(plan => plan.product === this.data.name);
	}

	async getAvailability(plan?: Plan) : Promise<Availabilities>
	{
		let url = "https://ca.ovh.com/engine/apiv6/dedicated/server/datacenter/availabilities/?excludeDatacenters=false&server="+this.data.name;
		if(plan)
			url += "&planCode="+plan.planCode;

		const availabilities = await OvhEcoApis.get(url);

		return availabilities.map((availability: _Availability) => new Availability(this.catalog, availability));
	}

	async isAvailable(): Promise<boolean>
	{
		const availabilities = await this.getAvailability();

		return availabilities.map(availability => availability.isAvailable())
			.reduce((prev, current) => (prev || current), false);
	}
}