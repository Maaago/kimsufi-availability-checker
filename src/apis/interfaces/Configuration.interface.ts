export default interface Configuration
{
	name: string;
	isCustom: boolean;
	isMandatory: boolean;
	values: Array<string> | null;
}