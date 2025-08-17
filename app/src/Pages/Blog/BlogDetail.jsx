import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_BLOG, GET_BLOG_DETAILS } from "../../Utils/Constant";
import { apiClient } from "../../lib/api-Client";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// 1️⃣ Base languages
import "prismjs/components/prism-markup";     // HTML, XML
import "prismjs/components/prism-css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

// 2️⃣ Languages that depend on the base
import "prismjs/components/prism-jsx";        // Needs javascript
import "prismjs/components/prism-typescript"; // Needs javascript
import "prismjs/components/prism-tsx";        // Needs typescript + jsx
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";       // Needs clike
import "prismjs/components/prism-c";          // Needs clike
import "prismjs/components/prism-cpp";        // Needs c
import "prismjs/components/prism-csharp";    // Needs java

import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";

// 4️⃣ Shell, DB, and configs
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-docker";



const BlogDetails = () => {
  const { _id } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  // Fetch single blog
  const fetchBlogDetails = async () => {
    try {
      const res = await apiClient.get(`${GET_BLOG_DETAILS}/${_id}`);
      if (res.status === 200) {
        setBlog(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch blog details", err);
    }
  };

  // Fetch all blogs
  const fetchAllBlogs = async () => {
    try {
      const res = await apiClient.get(GET_BLOG);
      if (res.status === 200) {
        setAllBlogs(res.data.blog || []);
      }
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
    fetchAllBlogs();
  }, [_id]);

  useEffect(() => {
    if (blog?.content) {
      const container = document.getElementById("blog-article");
      if (container && Prism?.highlightAllUnder) {
        Prism.highlightAllUnder(container);
      }

      // Copy button logic (safe check for .copy-btn existence)
      document.querySelectorAll(".copy-btn").forEach((btn) => {
        btn.onclick = () => {
          const code = btn.parentElement?.querySelector("code")?.innerText;
          if (code) {
            navigator.clipboard.writeText(code).then(() => {
              btn.innerText = "Copied!";
              setTimeout(() => (btn.innerText = "Copy"), 1500);
            });
          }
        };
      });
    }
  }, [blog?.content]);

  return (
 <main className="min-h-screen py-6 sm:py-10 px-4 sm:px-6" data-aos="zoom-in">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8" >
    {/* LEFT — Current Blog */}
    <div className="lg:col-span-3 rounded-lg shadow p-4 sm:p-6 ">
      { blog?.coverImage && (
        <img
          src={ blog?.coverImage}
          alt={ blog?.title}
          className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg mb-4 sm:mb-6"
        />
      )}

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{ blog?.title}</h1>
      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        By { blog?.author || "Unknown"} •{" "}
        { blog?.createdAt ? new Date( blog?.createdAt).toLocaleDateString() : ""}
      </p>

      { blog?.excerpt && (
        <p className="text-gray-700 mb-4 text-sm sm:text-base">{ blog?.excerpt}</p>
      )}

      {Array.isArray( blog?.tags) &&  blog?.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          { blog?.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-200 rounded-full text-xs sm:text-sm text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {blog?.content && (
        <div
          id="blog-article"
          className="prose max-w-none prose-sm sm:prose-base"
          dangerouslySetInnerHTML={{ __html:  blog?.content }}
        />
      )}
    </div>

    {/* RIGHT — Other Blogs */}
    <aside className="lg:col-span-1 space-y-4">
      <h2 className="text-base sm:text-lg font-bold border-b border-gray-300 pb-2">
        Other Blogs
      </h2>
      {allBlogs
        .filter((b) => b._id !== _id)
        .map((b) => (
          <Link
            key={b._id}
            to={`/blog/${b._id}`}
            className="block border rounded-lg overflow-hidden hover:shadow transition"
          >
            {b.coverImage && (
              <img
                src={b.coverImage}
                alt={b.title}
                className="w-full h-24 sm:h-28 object-cover"
              />
            )}
            <div className="p-2">
              <h3 className="font-semibold text-xs sm:text-sm">{b.title}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500">{b.slug}</p>
            </div>
          </Link>
        ))}
    </aside>
  </div>
</main>

  );
};

export default BlogDetails;