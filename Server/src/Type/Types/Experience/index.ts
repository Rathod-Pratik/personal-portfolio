export interface IExperience {
	year: string;
	duration: string;
	title: string;
	company: string;
	description: string;
}

export interface CreateExperienceRequestBody {
	year: string;
	duration?: string;
	title: string;
	company: string;
	description: string;
}

export type UpdateExperienceRequestBody = Partial<CreateExperienceRequestBody>;

export interface ExperienceIdParams {
	id: string;
	[key: string]: string;
}
