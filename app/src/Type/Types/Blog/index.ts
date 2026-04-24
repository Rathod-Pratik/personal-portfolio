export interface IBlog {
  _id: string;
  coverImage: string;
  title: string;
  tags?: string[];
  excerpt: string;
}

export type AdminBlogItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  tags: string[];
  content?: string;
  isPublished?: boolean;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogFormData = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  content: string;
  isPublished: boolean;
  coverImage: File | string | null;
};

export type CreateOrUpdateBlogPayload = {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  content: string;
  isPublished: boolean;
  coverImage: string;
};

export type GetBlogsResponse = {
  blog: AdminBlogItem[];
};

export type SignedUrlResponse = {
  url: string;
  publicUrl: string;
};
