export interface FetchStatesResponse {
	BlogLength: number;
	ProjectLength: number;
	NoteLength: number;
	ContactLength: number;
	SkillLength: number;
	AdminView: number;
}

export interface IncrementViewResponse {
	message: string;
	view: number;
}
