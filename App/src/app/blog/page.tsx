'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { GET_BLOG } from '@/utils/constants';
import type { AdminBlogItem } from '@/types';
import Card from './components/Card';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';

type GetBlogsResponse = {
  blog: AdminBlogItem[];
};

export default function Blog() {
  const [blogs, setBlogs] = useState<AdminBlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<GetBlogsResponse>(GET_BLOG);
        setBlogs(response.data.blog || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen flex flex-col py-4">
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-3xl font-bold text-center my-10 sm:hidden">
        Blogs
      </motion.h2>
      <div className="w-full px-2 sm:px-4">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 py-12">No blogs available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-4 lg:gap-6 justify-items-center">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id || index}
                className="w-full flex justify-center"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card item={blog} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
