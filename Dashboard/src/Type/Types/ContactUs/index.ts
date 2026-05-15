type ContactUsItem = {
	_id: string;
	name: string;
	email: string;
	mobile: string;
	projectType: string;
	budget: string;
	status: "new" | "contacted" | "inProgress" | "closed";
	message: string;
};

type GetContactResponse = {
	success: boolean;
	data: ContactUsItem[];
};

export type { ContactUsItem, GetContactResponse };
