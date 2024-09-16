import _Catalog, { Locale, PlanFamily } from "./interfaces/Catalog.interface"
import { Range } from "./interfaces/Plan.interface";
import Plan from "./Plan";
import Product from "./Product";

export default class Catalog
{
	constructor(readonly data: _Catalog) {}

	get products(): Array<Product>
	{
		return this.data.products.map(p => new Product(this, p));
	}

	getProduct(name: string): Product
	{
		const product = this.products.find(p => p.data.name === name);
		if(!product)
			throw new Error("Can't find the product "+name);

		return product;
	}

	getProductLineServers(productLine: string, onlyActives: boolean = true): Array<Product>
	{
		return this.products
			.filter(p => p.data.blobs?.technical.server?.range === productLine)
			// .filter(p => p.data)
	}

	getKimsufiServers(onlyActives: boolean = true): Array<Product>
	{
		return this.getProductLineServers("kimsufi", onlyActives);
	}

	getPlans(opts?: { productLine?: Range; onlyActive?: boolean; }): Array<Plan>
	{
		let plans = this.data.plans;
		if(opts)
		{
			if(opts.productLine)
				plans = plans.filter(plan => plan.blobs?.commercial?.range === opts.productLine)

			// if(opts.onlyActive)
			// 	plans = plans.filter(plan => plan.blobs.commercial?.range === opts.productLine)
		}
		
		return plans.map(plan => new Plan(this, plan));
	}
}