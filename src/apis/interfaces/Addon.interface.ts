export type AddonName = string;

export interface AddonFamily
{
	name: string;
	exclusive: boolean;
	mandatory: boolean;
	addons: Array<AddonName>;
	default: AddonName | null;
}