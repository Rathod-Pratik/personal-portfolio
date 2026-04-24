type ProjectDetail = {
	_id: string;
	title: string;
	createdAt: string;
	images: string;
	subtitle?: string;
	description: string;
	techStack?: string[];
	features?: string[];
	liveDemoLink?: string;
};

export type { ProjectDetail };
