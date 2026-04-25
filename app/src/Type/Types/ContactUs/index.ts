type ContactUsItem = {
	_id: string;
	name: string;
	email: string;
	mobile: string;
	message: string;
};

type GetContactResponse = {
	success: boolean;
	data: ContactUsItem[];
};

export type { ContactUsItem, GetContactResponse };
