import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";
import type { AxiosError } from "axios";
import { CREATE_BLOG, DELETE_BLOG, GET_BLOG, UPDATE_BLOG } from "@api";
import apiClient from "@apiClient";
import { Loading } from "@component";
import type {
	AdminBlogItem,
	BlogFormData,
	GetBlogsResponse,
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

const CreateBlog = () => {
	const navigate = useNavigate();
	const { id } = useParams<Params>();
	const [formData, setFormData] = useState<BlogFormData>(getInitialFormData());
	const [loading, setLoading] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const coverImagePreview = useMemo(() => {
		if (typeof formData.coverImage === "string") {
			return formData.coverImage;
		}

		if (formData.coverImage instanceof File) {
			return URL.createObjectURL(formData.coverImage);
		}

		return "";
	}, [formData.coverImage]);

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

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!validate()) {
			return;
		}

		try {
			setLoading(true);
			const payload = new FormData();
			const tags = formData.tags.map((tag) => tag.trim()).filter(Boolean);

			payload.append("title", formData.title.trim());
			payload.append("slug", formData.slug.trim());
			payload.append("excerpt", formData.excerpt.trim());
			payload.append("content", formData.content);
			payload.append("isPublished", String(formData.isPublished));

			tags.forEach((tag) => {
				payload.append("tags", tag);
			});

			if (formData.coverImage instanceof File) {
				payload.append("file", formData.coverImage);
			}

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

			<div className="rounded-2xl border border-gray-700 bg-gray-800/80 p-4 sm:p-5 shadow-lg">
				<div className="flex items-center justify-between gap-3 mb-4">
					<div>
						<p className="text-sm font-medium text-white">Cover Image</p>
						<p className="text-xs text-gray-400">Upload a blog header image before writing the post.</p>
					</div>
					{coverImagePreview && (
						<span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
							Ready
						</span>
					)}
				</div>

				<label className="group flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-600 bg-gray-900/40 p-4 text-center transition-all hover:border-blue-500 hover:bg-gray-900/70">
					{coverImagePreview ? (
						<div className="flex w-full flex-col items-center gap-4">
							<img
								src={coverImagePreview}
								alt="Cover preview"
								className="h-48 w-full max-w-3xl rounded-xl object-cover shadow-lg"
							/>
							<div className="space-y-1">
								<p className="text-sm font-medium text-white">
									{formData.coverImage instanceof File
										? formData.coverImage.name
										: typeof formData.coverImage === "string"
											?""
											: "Selected image"}
								</p>
								<p className="text-xs text-gray-400">Click to replace the cover image</p>
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center gap-3 py-8">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
								<svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
									<path d="M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5" />
									<path d="M12 16V4" />
									<path d="m8 8 4-4 4 4" />
								</svg>
							</div>
							<div>
								<p className="text-sm font-medium text-white">Drop or click to upload</p>
								<p className="text-xs text-gray-400">PNG, JPG, WEBP up to any reasonable size</p>
							</div>
						</div>
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
						className="hidden"
					/>
				</label>
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
					<label className="block mb-2 text-sm text-white">Content</label>
					<div data-color-mode="dark" className="min-h-[560px] rounded-lg overflow-hidden border border-gray-500">
						<MDEditor
							value={formData.content}
							onChange={(val) =>
								setFormData((prev) => ({ ...prev, content: val || "" }))
							}
							preview="live"
							height={560}
							textareaProps={{ required: true }}
							visibleDragbar={false}
							hideToolbar={false}
							visiblePreview="live"
							className="!bg-gray-600 !text-white"
						/>
					</div>
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
