import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { CREATE_BLOG, DELETE_BLOG, GET_BLOG, UPDATE_BLOG } from "@api";
import apiClient from "@apiClient";
import { Loading } from "@component";
import type {
	AdminBlogItem,
	BlogFormData,
	CreateOrUpdateBlogPayload,
	GetBlogsResponse,
	SignedUrlResponse,
} from "@Type";

type Params = {
	id?: string;
};

const getInitialFormData = (): BlogFormData => ({
	title: "",
	slug: "",
	excerpt: "",
	tags: [],
	content: "",
	isPublished: false,
	coverImage: null,
});

const toFormData = (blog: AdminBlogItem): BlogFormData => ({
	_id: blog._id,
	title: blog.title,
	slug: blog.slug,
	excerpt: blog.excerpt ?? "",
	tags: blog.tags ?? [],
	content: blog.content ?? "",
	isPublished: blog.isPublished ?? false,
	coverImage: blog.coverImage ?? null,
});

const sanitizeFileName = (fileName: string): string =>
	fileName
		.replace(/\s+/g, "_")
		.replace(/\+/g, "-")
		.replace(/[^a-zA-Z0-9._-]/g, "");

const CreateBlog = () => {
	const navigate = useNavigate();
	const { id } = useParams<Params>();
	const [formData, setFormData] = useState<BlogFormData>(getInitialFormData());
	const [loading, setLoading] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const isEditMode = Boolean(id);

	const blogQuery = useQuery<AdminBlogItem>({
		queryKey: ["admin-blog", id],
		enabled: isEditMode && Boolean(id),
		queryFn: async () => {
			const response = await apiClient.get<GetBlogsResponse>(GET_BLOG, {
				withCredentials: true,
			});

			const blog = response.data.blog.find((item) => item._id === id);
			if (!blog) {
				throw new Error("Blog not found");
			}

			return blog;
		},
	});

	useEffect(() => {
		if (blogQuery.data) {
			setFormData(toFormData(blogQuery.data));
		}
	}, [blogQuery.data]);

	useEffect(() => {
		if (!isEditMode || !blogQuery.isError) {
			return;
		}

		toast.error("Failed to load blog");
		navigate("/admin/blog");
	}, [blogQuery.isError, isEditMode, navigate]);

	const validate = (): boolean => {
		if (!formData.title.trim() || !formData.slug.trim()) {
			toast.error("Title and slug are required");
			return false;
		}

		if (!formData.content.trim()) {
			toast.error("Content is required");
			return false;
		}

		if (formData.tags.filter((tag) => tag.trim()).length === 0) {
			toast.error("At least one tag is required");
			return false;
		}

		if (!formData.coverImage) {
			toast.error("Cover image is required");
			return false;
		}

		return true;
	};

	const uploadImageIfNeeded = async (): Promise<string> => {
		if (typeof formData.coverImage === "string") {
			return formData.coverImage;
		}

		if (!formData.coverImage) {
			return "";
		}

		const signedUrlRes = await apiClient.post<SignedUrlResponse>(
			"/s3/signed-url",
			{
				fileName: sanitizeFileName(formData.coverImage.name),
				fileType: formData.coverImage.type,
				folderType: "blog/image",
			},
			{ withCredentials: true },
		);

		await fetch(signedUrlRes.data.url, {
			method: "PUT",
			body: formData.coverImage,
			headers: {
				"Content-Type": formData.coverImage.type,
			},
		});

		return signedUrlRes.data.publicUrl;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!validate()) {
			return;
		}

		try {
			setLoading(true);
			const coverImage = await uploadImageIfNeeded();

			const payload: CreateOrUpdateBlogPayload = {
				title: formData.title.trim(),
				slug: formData.slug.trim(),
				excerpt: formData.excerpt.trim(),
				tags: formData.tags.filter((tag) => tag.trim() !== ""),
				content: formData.content,
				isPublished: formData.isPublished,
				coverImage,
			};

			if (isEditMode && id) {
				const response = await apiClient.put(`${UPDATE_BLOG}/${id}`, payload, {
					withCredentials: true,
				});

				if (response.status === 200) {
					toast.success("Blog updated successfully");
					navigate("/admin/blog");
				}
			} else {
				const response = await apiClient.post(CREATE_BLOG, payload, {
					withCredentials: true,
				});

				if (response.status === 201 || response.status === 200) {
					toast.success("Blog created successfully");
					setFormData(getInitialFormData());
					navigate("/admin/blog");
				}
			}
		} catch (error) {
			const apiError = error as AxiosError;
			if (apiError.response?.status === 403) {
				toast.error("Access denied. Please login as admin.");
				navigate("/login");
				return;
			}

			toast.error(isEditMode ? "Failed to update blog" : "Failed to create blog");
			console.error(apiError);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!isEditMode || !id) {
			return;
		}

		const shouldDelete = window.confirm("Delete this blog?");
		if (!shouldDelete) {
			return;
		}

		try {
			setDeleting(true);
			const response = await apiClient.delete(`${DELETE_BLOG}/${id}`, {
				withCredentials: true,
			});
			if (response.status === 200) {
				toast.success("Blog deleted successfully");
				navigate("/admin/blog");
			}
		} catch (error) {
			const apiError = error as AxiosError;
			if (apiError.response?.status === 403) {
				toast.error("Access denied. Please login as admin.");
				navigate("/login");
				return;
			}

			toast.error("Failed to delete blog");
			console.error(apiError);
		} finally {
			setDeleting(false);
		}
	};

	if (isEditMode && blogQuery.isLoading) {
		return (
			<div className="flex justify-center items-center h-[70vh]">
				<Loading />
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
			<div className="flex items-center justify-between gap-3">
				<h2 className="text-xl font-semibold text-white">
					{isEditMode ? "Update Blog" : "Create Blog"}
				</h2>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => navigate("/admin/blog")}
						className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
					>
						Back
					</button>
					{isEditMode && (
						<button
							type="button"
							onClick={handleDelete}
							disabled={deleting}
							className="px-4 py-2 text-red-300 bg-red-900/40 border border-red-500 rounded-md hover:bg-red-900/60 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{deleting ? "Deleting..." : "Delete"}
						</button>
					)}
				</div>
			</div>

			<div className="grid gap-4">
				<div>
					<label className="block mb-2 text-sm text-white">Title</label>
					<input
						type="text"
						value={formData.title}
						onChange={(event) =>
							setFormData((prev) => ({ ...prev, title: event.target.value }))
						}
						className="border text-sm rounded-lg w-full p-2.5 bg-gray-600 border-gray-500 text-white"
						placeholder="Enter blog title"
						required
					/>
				</div>

				<div>
					<label className="block mb-2 text-sm text-white">Slug</label>
					<input
						type="text"
						value={formData.slug}
						onChange={(event) =>
							setFormData((prev) => ({ ...prev, slug: event.target.value }))
						}
						className="border text-sm rounded-lg w-full p-2.5 bg-gray-600 border-gray-500 text-white"
						placeholder="unique-blog-slug"
						required
					/>
				</div>

				<div>
					<label className="block mb-2 text-sm text-white">Excerpt</label>
					<textarea
						rows={2}
						value={formData.excerpt}
						onChange={(event) =>
							setFormData((prev) => ({ ...prev, excerpt: event.target.value }))
						}
						className="block p-2.5 w-full text-sm rounded-lg border bg-gray-600 border-gray-500 text-white"
						placeholder="Short blog summary"
					/>
				</div>

				<div>
					<label className="block mb-2 text-sm text-white">Content (Markdown)</label>
					<textarea
						rows={8}
						value={formData.content}
						onChange={(event) =>
							setFormData((prev) => ({ ...prev, content: event.target.value }))
						}
						className="block p-2.5 w-full text-sm rounded-lg border bg-gray-600 border-gray-500 text-white"
						placeholder="Write your blog here"
						required
					/>
				</div>

				<div>
					<label className="block mb-2 text-sm text-white">Upload Cover Image</label>
					{typeof formData.coverImage === "string" && (
						<p className="text-gray-400 mb-1">
							Current file: {formData.coverImage.split("/").pop()}
						</p>
					)}
					<input
						type="file"
						accept="image/*"
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							const file = event.target.files?.[0] ?? null;
							if (!file) {
								return;
							}

							setFormData((prev) => ({ ...prev, coverImage: file }));
						}}
						className="block w-full text-sm text-gray-300 border border-gray-500 rounded-lg cursor-pointer bg-gray-600 focus:outline-none"
					/>
				</div>

				<div>
					<label className="block mb-2 text-sm text-white">Tags (comma separated)</label>
					<input
						type="text"
						value={formData.tags.join(", ")}
						onChange={(event) =>
							setFormData((prev) => ({
								...prev,
								tags: event.target.value
									.split(",")
									.map((tag) => tag.trim())
									.filter(Boolean),
							}))
						}
						className="border text-sm rounded-lg w-full p-2.5 bg-gray-600 border-gray-500 text-white"
						placeholder="react, mern, portfolio"
					/>
				</div>

				<div className="flex items-center gap-2">
					<input
						id="isPublished"
						type="checkbox"
						checked={formData.isPublished}
						onChange={(event) =>
							setFormData((prev) => ({ ...prev, isPublished: event.target.checked }))
						}
						className="w-4 h-4"
					/>
					<label htmlFor="isPublished" className="text-sm text-white">
						Publish now
					</label>
				</div>
			</div>

			<div className="flex items-center gap-2 pt-2">
				{isEditMode && (
					<button
						type="button"
						disabled={deleting}
						onClick={handleDelete}
						className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{deleting ? "Deleting..." : "Delete"}
					</button>
				)}
				<button
					type="submit"
					disabled={loading}
					className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{loading ? "Saving..." : isEditMode ? "Update Blog" : "Create Blog"}
				</button>
			</div>
		</form>
	);
};

export default CreateBlog;
