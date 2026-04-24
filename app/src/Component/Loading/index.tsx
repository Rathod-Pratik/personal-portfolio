const Loading = () => {
  return (
    <div className="absolute inset-0 z-[999999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
