export interface Quantity
{
	min: number;
	max: number | null;
}

export type Mode = "default" | "degressivity3" | "degressivity6" | "degressivity12" | "degressivity24" | "upfront3" | "upfront6" | "upfront12" | "upfront24";

//TODO: type?
export type Promotion = any;

//TODO: type?
export interface EngagementConfiguration
{
	defaultEndAction: "REACTIVATE_ENGAGEMENT";
	duration: "P3M" | "P6M" | "P12M" | "P24M";
	type: "periodic" | "upfront";
}

export default interface Pricing
{
	phase: number;
	capacities: Array<string>;
	commitment: number;
	description: string;
	interval: number;
	intervalUnit: "none" | "month";
	quantity: Quantity;
	repeat: Quantity;
	price: number;
	tax: number;
	mode: Mode,
	strategy: "tiered",
	mustBeCompleted: boolean;
	type: "rental";
	promotions: Array<Promotion>;
	engagementConfiguration: EngagementConfiguration | null;
}