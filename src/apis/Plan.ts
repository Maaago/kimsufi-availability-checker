import Catalog from "./Catalog";
import _Plan from "./interfaces/Plan.interface"
import Product from "./Product";

export default class Plan
{
	constructor(private readonly catalog: Catalog, readonly data: _Plan) {}

	get product(): Product
	{
		const product: Product | undefined = this.catalog.getProduct(this.data.product);
		if(!product)
			throw new Error("Can't find product "+this.data.product);

		return product;
	}

	isActive(): boolean
	{
		return (this.data.blobs?.commercial?.range !== undefined);
	}
}