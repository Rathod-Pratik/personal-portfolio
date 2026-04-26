import { useNavigate } from "react-router-dom";
import type { ProjectCardProps } from "@Type";
import { usePrivateObjectUrl } from "@utils/s3Upload";

const Card = ({ item }: ProjectCardProps) => {
  const navigate=useNavigate();
  const imageUrl = usePrivateObjectUrl(item.images);
  const RedirectToProject = (_id: string) => {
    return navigate(`/projectDetails/${_id}`)
  };

  return (
    <div
      data-aos="fade-up"
      key={item._id}
      className="w-full max-w-[420px] mx-auto h-[425px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-800 dark:border-black"
    >
      <div className="flex flex-col items-center p-6">
        <img src={imageUrl} className="mb-4 rounded-lg object-cover w-full h-44" alt={item.title} />
        <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white text-center">
          {item.title}
        </h5>
        {item.techStack?.length ? (
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
          { item.description.slice(0, 70) + "..."}
        </span>
        <div className="flex flex-row mt-4">
          {item.liveDemoLink && (
            <a
              className="inline-block text-white bg-purple-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-purple-900 text-center"
              href={item.liveDemoLink}
              target="_blank"
              rel="noreferrer"
            >
              Demo
            </a>
          )}
          <a
            className="inline-block text-white bg-purple-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-purple-900 text-center"
            onClick={()=>RedirectToProject(item._id)}
            rel="noreferrer"
          >
            Details
          </a>
        </div>
        {item.note && (
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            {item.note}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
