import { Datacenter as _Datacenter } from "./interfaces/Availability.interface";

export default class Datacenter
{
	constructor(readonly data: _Datacenter) {}

	hasProductAvailability(): boolean
	{
		return (this.data.availability !== "unavailable");
	}
}