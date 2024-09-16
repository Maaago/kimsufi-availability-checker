import Plan from "./Plan.interface";
import Product from "./Product.interface";

export interface Locale
{
	currencyCode: string;
	subsidiary: string;
	taxRate: number;
}

export interface PlanFamily
{
	name: string;
}

export default interface Catalog
{
	catalogId: number;
	locale: Locale;
	plans: Array<Plan>;
	products: Array<Product>;
	addons: Array<Plan>;
	planFamilies: Array<PlanFamily>;
}