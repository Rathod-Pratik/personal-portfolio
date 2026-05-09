import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { GET_BLOG_DETAILS } from "../../Utils/Constant";
import { apiClient } from "../../lib/api-Client";
import { Check, Copy } from "lucide-react";

import type { BlogDetail } from "@Type";

import { Loading } from "@component";

 

const BlogDetails = () => {
  const { _id } = useParams();
  const [copiedCode, setCopiedCode] = useState("");

  useEffect(() => {
    if (!copiedCode) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCopiedCode("");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [copiedCode]);

  // Blog Details Query
  const blogQuery = useQuery<BlogDetail>({
    queryKey: ["blog-details", _id],
    enabled: Boolean(_id),

    queryFn: async () => {
      const response = await apiClient.get<BlogDetail>(
        `${GET_BLOG_DETAILS}/${_id}`
      );

      return response.data;
    },
  });

  const blog = blogQuery.data ?? null;

  const loading = blogQuery.isLoading;

  return (
    <main
      className="min-h-screen py-6 sm:py-10 px-4 sm:px-6"
      data-aos="zoom-in"
    >
      {loading && <Loading />}

      <div className="max-w-4xl mx-auto">

        {/* Cover Image */}
        {blog?.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-center">
          {blog?.title}
        </h1>

        {/* Meta */}
        <p className="text-sm text-gray-400 mb-4 text-center">
          By {blog?.author || "Unknown"} • {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
        </p>

        {/* Excerpt */}
        {blog?.excerpt && (
          <p className="text-gray-300 text-base leading-7 mb-6 text-center">
            {blog.excerpt}
          </p>
        )}

        {/* Tags */}
        {/* {Array.isArray(blog?.tags) && blog.tags.length > 0 && (
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )} */}

        {/* Markdown Content */}
        {blog?.content && (
          <article className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h2>,
              p: ({ children }) => <p className="text-gray-300 leading-7 mb-4">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-300 my-4">{children}</blockquote>,
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                if (!inline && match) {
                  const codeString = String(children).replace(/\n$/, "");
                  const isCopied = copiedCode === codeString;
                  return (
                    <div className="my-6 rounded overflow-hidden relative">
                      <div className="absolute top-2 right-2 z-10">
                        <button
                          type="button"
                          onClick={() => {
                            try {
                              navigator.clipboard?.writeText(codeString);
                              setCopiedCode(codeString);
                            } catch (err) {
                              console.error("Copy failed", err);
                            }
                          }}
                          className={`p-2 rounded transition-colors ${
                            isCopied
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-gray-800/60 hover:bg-gray-700 text-gray-200"
                          }`}
                          aria-label="Copy code"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <SyntaxHighlighter language={match[1]} style={tomorrow} PreTag="div" customStyle={{ margin: 0, padding: 20, background: "#0f172a" }} {...props}>
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                return <code className="bg-gray-800 text-pink-400 px-2 py-1 rounded text-sm">{children}</code>;
              },
              a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-blue-400 underline">{children}</a>,
              hr: () => <hr className="border-gray-700 my-8" />
            }}>
              {blog.content}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </main>
  );
};

export default BlogDetails;