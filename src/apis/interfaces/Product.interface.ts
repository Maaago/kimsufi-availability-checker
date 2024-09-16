import Configuration from "./Configuration.interface";
import { Range } from "./Plan.interface";

export interface Disk
{
	specs: "2.5in 7mm" | "3.5in" | "M.2 80";
	usage: "data";
	number: number;
	capacity: number;
	interface: "SATA" | "NVMe";
	technology: "HDD" | "SSD";
}

export interface Storage
{
	raid: "Soft RAID";
	disks: Array<Disk>;
	hotSwap: boolean;
	raidDetails: {
	  type: "Soft RAID"
	};
}

export interface Memory
{
	ecc: boolean;
    size: number;
    ramType: "DDR3" | "DDR4";
    frequency: number;
}

export interface Bandwidth
{
	burst: number;
    level: number;
    limit: number;
    guaranteed: boolean;
}

export interface Vrack extends Bandwidth {}

export interface License
{
	cpu?: {
		number: number;
	};
	cores?: {
		total: number;
		number: number;
	}
    flavor?: string;
    edition: string;
    version?: string;
    distribution?: string;
    nbOfAccount: number;
}

export interface Server
{
	cpu: {
		boost: number;
		brand: "Intel" | "AMD",
		cores: number;
		model: string;
		score?: number;
		number: number;
		threads: number;
		frequency: number;
	},
	frame: {
		size: "1U" | "0.5U" | "0.25U";
		model: "OVH" | "SM";
		dualPowerSupply: boolean;
	},
	range: Range;
	services: {
		sla: number;
		antiddos: "standard" | "game";
		includedBackup?: number;
	},
}

export interface Technical
{
	storage?: Storage;
	memory?: Memory;
	bandwidth?: Bandwidth;
	vrack?: Vrack;
	license?: License;
	server?: Server;
}

export default interface Product
{
	name: string;
	description: string;
	blobs: {
		technical: Technical;
	} | null,
	configurations: Array<Configuration>;
}