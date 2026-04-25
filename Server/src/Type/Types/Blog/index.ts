export interface IBlog {
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	coverImage: string;
	tags: string[];
	author: string;
	isPublished: boolean;
}

export interface CreateBlogRequestBody {
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	coverImage: string;
	tags?: string[];
	isPublished?: boolean;
}

export interface BlogIdParams {
	id: string;
}

export type UpdateBlogRequestBody = Partial<CreateBlogRequestBody>;
