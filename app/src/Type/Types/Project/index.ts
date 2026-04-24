type ProjectDifficulty = "Easy" | "Medium" | "Hard";
type ProjectDifficultyOption = "" | ProjectDifficulty;

type ProjectItem = {
	_id: string;
	title: string;
	subtitle?: string;
	description: string;
	images: string;
	difficult?: ProjectDifficulty;
	liveDemoLink?: string;
	techStack?: string[];
	features?: string[];
	note?: string;
};

type ProjectFormData = {
	_id?: string;
	title: string;
	subtitle: string;
	techStack: string[];
	description: string;
	liveDemoLink: string;
	images: string;
	imageFile: File | null;
	features: string[];
	difficult: ProjectDifficultyOption;
};

type CreateOrUpdateProjectPayload = {
	_id?: string;
	title: string;
	subtitle: string;
	description: string;
	techStack: string[];
	liveDemoLink: string;
	features: string[];
	images: string;
	difficult: ProjectDifficultyOption;
};

type ProjectCardProps = {
	item: ProjectItem;
};

export type {
	ProjectDifficulty,
	ProjectDifficultyOption,
	ProjectItem,
	ProjectFormData,
	CreateOrUpdateProjectPayload,
	ProjectCardProps,
};
