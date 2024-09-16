import { AddonFamily } from "./Addon.interface";
import Configuration from "./Configuration.interface";
import type Pricing from "./Pricing.interface";

//TODO: type?
export type ConsumptionConfiguration = any;

//TODO: type?
export type Family = any;

export type Range = "kimsufi" | "soyoustart" | "rise";

export interface Feature
{
	name: "baremetal-server-usecases";
	string: "confidential-computing" | "vdi" | "archive-backup-recovery";
}

export default interface Plan
{
	planCode: string;
	invoiceName: string;
	addonFamilies: Array<AddonFamily>;
	product: string;
	pricingType: "rental";
	consumptionConfiguration: ConsumptionConfiguration | null;
	pricings: Array<Pricing>;
	configurations:	Array<Configuration>;
	family:	Family | null;
	blobs?: {
		commercial?: {
			range?: Range;
			features?: Array<Feature>;
		}
	}
}