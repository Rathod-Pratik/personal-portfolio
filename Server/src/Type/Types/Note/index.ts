export interface INote {
	title: string;
	description: string;
	note_image_url: string;
	note_pdf_url: string;
}

export interface CreateNoteRequestBody {
	title: string;
	description: string;
	imageUrl: string;
	fileUrl: string;
}

export interface EditNoteRequestBody {
	_id: string;
	title?: string;
	description?: string;
	imageUrl?: string;
	fileUrl?: string;
}

export interface DeleteNoteRequestParams {
	_id: string;
	[key: string]: string;
}

export type UpdateNoteData = Partial<Pick<INote, "title" | "description" | "note_image_url" | "note_pdf_url">>;
