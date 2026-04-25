export interface IContact {
	name: string;
	email: string;
	mobile: string;
	message: string;
}

export interface CreateContactRequestBody {
	name: string;
	email: string;
	mobile: string;
	message: string;
}

export interface DeleteContactRequestParams {
	_id: string;
	[key: string]: string;
}
