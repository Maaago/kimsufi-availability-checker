export interface Datacenter
{
	availability: "1H-low" | "1H-high" | "24H" | "72H" | "240H" | "480H" | "720H" | "comingSoon" | "unavailable";
	datacenter: string;
}

export default interface Availability
{
	fqn: string;
	memory: string;
	planCode: string;
	server: string;
	storage: string;
	datacenters: Array<Datacenter>;
}