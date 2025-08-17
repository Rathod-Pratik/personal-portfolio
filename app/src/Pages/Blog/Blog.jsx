import React, { useEffect } from "react";
import { apiClient } from "../../lib/api-Client";
import { GET_BLOG } from "../../Utils/Constant";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = React.useState([]);

  const fetchBlog = async () => {
    try {
      const response = await apiClient.get(GET_BLOG);
      if (response.status === 200) {
        setBlogs(response.data.blog);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Blogs</h1>
            </div>
          </header>
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {blogs.map((item) => (
              <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                {/* Image */}
                <Link to={"/blog/" + item._id} className="block">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/20">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                  {/* Tags */}
                  {item.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase opacity-90"
                          title={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-semibold leading-snug">
                    <Link to={"/blog/" + item._id}
                      className="outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm/6 text-white/80">
                    {item.excerpt.length > 120
                      ? item.excerpt.substring(0, 120) + "..."
                      : item.excerpt}
                  </p>

                  <div className="mt-auto" />

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      to={"/blog/" + item._id}
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 px-3 py-1.5 text-sm font-medium opacity-90 transition hover:opacity-100"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Blog;
