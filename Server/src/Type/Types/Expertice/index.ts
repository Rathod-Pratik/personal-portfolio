export interface IExpertice {
	title: string;
	description: string;
	image: string;
	linkTo: string;
}

export interface CreateExperticeRequestBody {
	title: string;
	description: string;
	image: string;
	linkTo?: string;
}

export type UpdateExperticeRequestBody = Partial<CreateExperticeRequestBody>;

export interface ExperticeIdParams {
	id: string;
	[key: string]: string;
}
