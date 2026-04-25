export interface IProject {
	title: string;
	subtitle?: string;
	description: string;
	techStack: string[];
	features?: string[];
	liveDemoLink?: string;
	difficult?: string;
	images?: string;
	githubLink?: string;
}

export interface CreateProjectRequestBody {
	title: string;
	subtitle: string;
	description: string;
	techStack: string[];
	features: string[];
	liveDemoLink: string;
	githubLink?: string;
	images: string;
	difficult: string;
}

export interface EditProjectRequestBody {
	_id: string;
	title?: string;
	subtitle?: string;
	description?: string;
	techStack?: string[];
	features?: string[];
	liveDemoLink?: string;
	githubLink?: string;
	images?: string;
	difficult?: string;
}

export interface ProjectIdParams {
	_id: string;
	[key: string]: string;
}

export type UpdateProjectData = Partial<IProject>;
