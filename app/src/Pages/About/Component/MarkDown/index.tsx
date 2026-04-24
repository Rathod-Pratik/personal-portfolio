import { Components } from "react-markdown";

const MarkDown: Components = {
  h1: ({ ...props }) => (
    <h1 className="text-3xl font-bold mb-4 text-white mt-8" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2 className="text-2xl font-semibold mb-3 text-white mt-8" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="text-xl font-medium mb-2 text-white mt-6" {...props} />
  ),
  p: ({ ...props }) => <p className="mb-4 leading-relaxed text-[17px]" {...props} />,
  ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
  ol: ({ ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />
  ),
  li: ({ ...props }) => <li className="mb-1" {...props} />,
  strong: ({ ...props }) => (
    <strong className="font-bold text-white" {...props} />
  ),
  a: ({ ...props }) => (
    <a
      className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className="border-l-4 border-gray-500 pl-4 py-1 mb-4 italic text-gray-400 bg-gray-800/50 rounded-r"
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const isBlockCode = Boolean(className);

    return isBlockCode ? (
      <code
        className="block bg-gray-900 p-4 rounded-lg my-4 overflow-x-auto text-sm font-mono border border-gray-700"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-400 font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
};

export default MarkDown;