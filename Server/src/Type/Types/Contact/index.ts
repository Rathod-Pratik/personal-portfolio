export interface IContact {
	name: string;
	email: string;
	mobile: string;
	projectType: string;
	budget: string;
	status: "new" | "contacted" | "inProgress" | "closed";
	message: string;
}

export interface CreateContactRequestBody {
	name: string;
	email: string;
	mobile: string;
	projectType: string;
	budget: string;
	status?: "new" | "contacted" | "inProgress" | "closed";
	message: string;
}

export interface UpdateContactStatusRequestBody {
	status: "new" | "contacted" | "inProgress" | "closed";
}

export type ContactOptionType = "projectType" | "budget";

export interface IContactOption {
	type: ContactOptionType;
	value: string;
	isActive: boolean;
	order: number;
}

export interface CreateContactOptionRequestBody {
	value: string;
	isActive?: boolean;
	order?: number;
}

export interface UpdateContactOptionRequestBody {
	value?: string;
	isActive?: boolean;
	order?: number;
}

export interface ContactOptionRequestParams {
	type: ContactOptionType;
	_id: string;
	[key: string]: string;
}

export interface ContactFormOptionsResponse {
	success: boolean;
	data: {
		projectTypes: string[];
		budgets: string[];
	};
}

export interface ContactOptionListResponse {
	success: boolean;
	data: IContactOption[];
}

export interface DeleteContactRequestParams {
	_id: string;
	[key: string]: string;
}
