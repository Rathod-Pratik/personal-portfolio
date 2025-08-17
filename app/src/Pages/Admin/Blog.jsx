import { useState, useEffect } from "react";
import { apiClient } from "../../lib/api-Client";
import { CREATE_BLOG, DELETE_BLOG, GET_BLOG, UPDATE_BLOG } from "../../Utils/Constant";
import { toast } from "react-toastify";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const res = await apiClient.get(GET_BLOG);
      setBlogs(res.data.blog);
    } catch (err) {
      console.error(err);
    }
  };

  const sanitizeFileName = (fileName) => {
    return fileName
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .replace(/\+/g, "-") // Replace + with -
      .replace(/[^a-zA-Z0-9._-]/g, ""); // Remove any other invalid characters
  };

  // Create Blog
  const createBlog = async () => {
    if (formData.title.trim() === "" || formData.slug.trim() === "") {
      toast.error("Title and Slug are required fields.");
      return;
    }
    if (!formData.coverImage) {
      toast.error("Cover Image is required.");
      return;
    }
    if (formData.content.trim() === "") {
      toast.error("Content is required.");
      return;
    }
    if (formData.tags.length === 0) {
      toast.error("At least one tag is required.");
      return;
    }

    try {
      let imageRes = null;

      // Upload only if it's a new file (not a URL string)
      if (typeof formData.coverImage !== "string") {
        const signedUrlRes = await apiClient.post(
          "/s3/signed-url",
          {
            fileName: sanitizeFileName(formData.coverImage.name),
            fileType: formData.coverImage.type,
            folderType: `blog/image`,
          },
          { withCredentials: true }
        );

        imageRes = signedUrlRes;

        await fetch(signedUrlRes.data.url, {
          method: "PUT",
          body: formData.coverImage,
          headers: { "Content-Type": formData.coverImage.type },
        });
      }

      const payload = {
        title: formData.title.trim(),
        slug: formData.slug,
        excerpt: formData.excerpt,
        tags: formData.tags,
        content: formData.content,
        isPublished: formData.isPublished,
        coverImage:
          typeof formData.coverImage === "string"
            ? formData.coverImage
            : imageRes.data.publicUrl, // use new upload URL if uploaded
      };

      setLoading(true);
      const response = await apiClient.post(CREATE_BLOG, payload, {
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success("Blog Uploaded Successfully");
        setBlogs((prev) => [...prev, response.data.blog]); // don't mutate
        setModal(false);
        setFormData({});
      }
    } catch (err) {
      toast.error("Server is Down");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update Blog
  const updateBlog = async (id) => {
    const uploadRequest = [];
    if (
      formData.coverImage &&
      typeof formData.coverImage !== "string" &&
      formData.coverImage.type.startsWith("image/")
    ) {
      uploadRequest.push(
        apiClient.post(
          "/s3/signed-url",
          {
            fileName: sanitizeFileName(formData.coverImage.name),
            fileType: formData.coverImage.type,
            folderType: `blog/image`,
          },
          {
            withCredentials: true,
          }
        )
      );
    }

    const [imageRes] = await Promise.all(uploadRequest);
    const uploadPromises = [];
    if (
      formData.coverImage &&
      typeof formData.coverImage !== "string" &&
      formData.coverImage.type.startsWith("image/")
    ) {
      uploadPromises.push(
        fetch(imageRes.data.url, {
          method: "PUT",
          body: formData.coverImage,
          headers: { "Content-Type": formData.coverImage.type },
        })
      );
    }

    await Promise.all(uploadPromises);

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug,
      excerpt: formData.excerpt,
      tags: formData.tags,
      content: formData.content,
      isPublished: formData.isPublished,
      coverImage: imageRes?.data.publicUrl
        ? imageRes.data.publicUrl
        : formData.coverImage,
    };

    try {
      setLoading(true);
      const response = await apiClient.put(`${UPDATE_BLOG}/${id}`, payload, {
        withCredentials: true,
      });
      if (response.status == 200) {
        toast.success("Blog Updated Successfully");
        blogs.map((item) =>
          item._id == id ? response.data.updatedBlog : item
        );
        setModal(false);
        setFormData({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Blog
  const deleteBlog = async (id) => {
    try {
      const response=await apiClient.delete(`/${DELETE_BLOG}/${id}`,{
        withCredentials: true
      });
      if(response.status === 200) {
        toast.success("Blog Deleted Successfully");
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter blogs by search
  // const filteredBlogs = blogs.filter((blog) =>
  //   blog.title.toLowerCase().includes(search.toLowerCase())
  // );

  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false); 

  const showModal = () => {
    if (isOpen) {
      // Trigger closing animation
      setAnimate(false);
      setTimeout(() => {
        setIsOpen(false);
        setFormData({});
      }, 300); 
    } else {
      setIsOpen(true);
      setFormData({});
      setTimeout(() => {
        setAnimate(true);
      }, 10);
    }
  };

  const editBlog = (blog) => {
    setFormData(blog);
    setIsOpen(true);
    setTimeout(() => {
      setAnimate(true);
    }, 10);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-5">
      {/* Search & New Button */}
      <div className="flex justify-evenly gap-3 py-5">
        <input
          //   onChange={(e) => setSearch(e.target.value)}
          className="border-2 text-gray-500 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Blog"
        />
        <button
          onClick={showModal}
          className="text-white bg-blue-500 px-5 cursor-pointer py-2 rounded-md"
        >
          New
        </button>
      </div>

      {/* Blog List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {/* Blog Image */}
            {blog.coverImage && (
              <div className="p-2">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-48 w-full object-cover rounded-lg"
                />
                </div>
            )}

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-gray-400 flex-grow">
                {blog.excerpt?.split(" ").slice(0, 20).join(" ")}...
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => editBlog(blog)}
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

      {/* Modal */}
      {isOpen && (
        <div
          className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full
          bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 ease-out
          ${animate ? "opacity-100" : "opacity-0"}`}
        >
          <div className="relative p-4 w-full max-w-2xl">
            <div
              className={`relative rounded-lg shadow-sm bg-gray-700 max-h-[90vh] overflow-y-auto custom-scroll transform transition-all duration-150 ease-out
              ${
                animate
                  ? "scale-100 opacity-100 translate-y-0"
                  : "scale-95 opacity-0 -translate-y-5"
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-white">
                  {formData._id ? "Update Blog" : "Add New Blog"}
                </h3>
                <button
                  type="button"
                  onClick={showModal}
                  className="text-gray-400 hover:bg-gray-600 rounded-lg w-8 h-8 flex justify-center items-center"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                <div className="grid gap-4 mb-4">
                  {/* Title */}
                  <div>
                    <label className="block mb-2 text-sm text-white">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="border text-sm rounded-lg w-full p-2.5 bg-gray-600 border-gray-500 text-white"
                      placeholder="Enter blog title"
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block mb-2 text-sm text-white">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="border text-sm rounded-lg w-full p-2.5 bg-gray-600 border-gray-500 text-white"
                      placeholder="unique-blog-slug"
                      required
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block mb-2 text-sm text-white">
                      Excerpt
                    </label>
                    <textarea
                      rows="2"
                      value={formData.excerpt || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, excerpt: e.target.value })
                      }
                      className="block p-2.5 w-full text-sm rounded-lg border bg-gray-600 border-gray-500 text-white"
                      placeholder="Short blog summary"
                    ></textarea>
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block mb-2 text-sm text-white">
                      Content (Markdown)
                    </label>
                    <textarea
                      rows="6"
                      value={formData.content || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="block p-2.5 w-full text-sm rounded-lg border bg-gray-600 border-gray-500 text-white"
                      placeholder="Write your blog here... Use markdown for formatting"
                    ></textarea>
                  </div>

                  {/* Cover Image Upload */}
                  <div>
                    <label className="block mb-2 text-sm text-white">
                      Upload Cover Image
                    </label>
                    {typeof formData.coverImage == "string" && (
                      <p className="text-gray-400 mb-1">
                        Current file: {formData.coverImage.split("/").pop()}
                      </p>
                    )}
                    <input
                      id="inputImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFormData({ ...formData, coverImage: file });
                        }
                      }}
                      className="block w-full text-sm text-gray-300 border border-gray-500 rounded-lg cursor-pointer bg-gray-600 focus:outline-none"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block mb-2 text-sm text-white">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags?.join(", ") || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tags: e.target.value
                            .split(",")
                            .map((tag) => tag.trim()),
                        })
                      }
                      className="border text-sm rounded-lg w-full p-2.5 bg-gray-600 border-gray-500 text-white"
                      placeholder="react, mern, portfolio"
                    />
                  </div>

                  {/* Publish */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isPublished || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isPublished: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <label className="text-sm text-white">Publish Now</label>
                  </div>
                </div>

                {/* Submit */}
                <button
                  disabled={loading}
                  onClick={() =>
                    formData?._id ? updateBlog(formData._id) : createBlog()
                  }
                  className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? "Saving..." : "Save Blog"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
