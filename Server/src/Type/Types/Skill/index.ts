export interface ISkill {
	language: string;
	percentage: number;
	color: string;
}

export interface CreateSkillRequestBody {
	language: string;
	percentage: number;
	color: string;
}

export interface EditSkillRequestBody {
	_id: string;
	language?: string;
	percentage?: number;
	color?: string;
}

export interface DeleteSkillRequestParams {
	_id: string;
	[key: string]: string;
}

export type UpdateSkillData = Partial<ISkill>;
