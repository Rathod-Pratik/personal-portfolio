import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../lib/api-Client";
import { DELETE_BLOG, GET_BLOG } from "../../../Utils/Constant";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { AdminBlogItem } from "@Type";
import { Loading } from "@component";
import { usePrivateObjectUrl } from "@utils/s3Upload";

const BlogThumb = ({ blog }: { blog: AdminBlogItem }) => {
  const coverImage = usePrivateObjectUrl(blog.coverImage);

  return coverImage ? (
    <img
      src={coverImage}
      alt={blog.title}
      className="h-48 w-full object-cover rounded-lg"
    />
  ) : null;
};

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<AdminBlogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const deleteBlog = async (id: string) => {
    const shouldDelete = window.confirm("Delete this blog?");
    if (!shouldDelete) {
      return;
    }

    try {
      const response = await apiClient.delete(`${DELETE_BLOG}/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Blog Deleted Successfully");
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
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
    }
  };

  const filteredBlogs = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      return blogs;
    }

    return blogs.filter((blog) => blog.title.toLowerCase().includes(keyword));
  }, [blogs, search]);

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      try {
        const res = await apiClient.get(GET_BLOG);
        if (isMounted) {
          setBlogs(res.data.blog);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-evenly gap-3 py-5">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="border-2 text-gray-500 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Blog"
        />
        <button
          onClick={() => navigate("/admin/blog/create")}
          className="text-white bg-blue-500 px-5 cursor-pointer py-2 rounded-md"
        >
          New
        </button>
      </div>

      {loading ? (
        <div className="flex justify-start items-center h-[70vh]">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 p-4">
          {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="w-full bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {blog.coverImage && (
              <div className="p-2">
                <BlogThumb blog={blog} />
              </div>
            )}

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-gray-400 flex-grow">
                {blog.excerpt?.split(" ").slice(0, 20).join(" ") ?? "No excerpt"}...
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/admin/blog/edit/${blog._id}`)}
                  className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
