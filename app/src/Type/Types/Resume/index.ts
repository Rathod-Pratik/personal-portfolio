type ResumeItem = {
	_id: string;
	CV: string;
};

type GetResumeResponse = {
	success: boolean;
	data: ResumeItem[];
};

type CreateOrUpdateResumeResponse = {
	success: boolean;
	data: ResumeItem;
};

type ResumeSignedUrlResponse = {
	url: string;
	publicUrl: string;
};

export type {
	ResumeItem,
	GetResumeResponse,
	CreateOrUpdateResumeResponse,
	ResumeSignedUrlResponse,
};
