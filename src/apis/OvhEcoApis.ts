import Catalog from "./Catalog";

export default class OvhEcoApis
{
	static async get(url: string) : Promise<any>
	{
		return fetch(url).then(res => res.json());
	}

	static async getCatalog() : Promise<Catalog>
	{
		return OvhEcoApis.get("https://ca.api.ovh.com/1.0/order/catalog/public/eco?ovhSubsidiary=WE")
			.then(data => new Catalog(data));
	}
}