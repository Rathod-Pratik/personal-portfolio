export interface IHero {
	greeting: string;
	name: string;
	roles: string[];
	description: string;
	image: string;
}

export interface UpdateHeroRequestBody {
	greeting?: string;
	name?: string;
	roles?: string[];
	description?: string;
	image?: string;
}
