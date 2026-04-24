import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@apiClient";
import { GET_BLOG } from "@api";
import { toast } from "react-toastify";
import { Card } from "./Component";
import { Loading } from "@component";
import type { IBlog } from "@Type";

type GetBlogsResponse = {
  blog: IBlog[];
};

const Blog = () => {
  const blogsQuery = useQuery<IBlog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await apiClient.get<GetBlogsResponse>(GET_BLOG);
      return response.data.blog;
    },
  });

  useEffect(() => {
    if (blogsQuery.isError) {
      toast.error("Failed to fetch blogs");
    }
  }, [blogsQuery.isError]);

  const blogs = blogsQuery.data ?? [];

  return (
    <div>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 sm:hidden">Blogs</h2>
          {blogsQuery.isLoading && <Loading />}

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {blogs.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Blog;
