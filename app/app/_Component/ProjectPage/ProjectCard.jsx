import React,{useEffect} from 'react'
import { Badge } from "@/components/ui/badge";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
const ProjectCard = ({item}) => {
    useEffect(() => {
        AOS.init();
      }, []);
  return (
    <div
          data-aos="fade-up"
            key={item._id}
            className="w-full h-[410px] max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-800 dark:border-black"
          >
            <div className="flex flex-col items-center p-6">
              <img
                src={`${item.output}`}
                className="mb-4"
                alt={item.file_name}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {item.file_name}
              </h5>
              <span className="flex gap-3 my-2 flex-wrap justify-center">
                {item.language.map((lang, index) => (
                  <Badge key={index}>{lang}</Badge>
                ))}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {item.description}
              </span>
              <div className="flex flex-row mt-4">
                <a
                  className="inline-block text-white bg-purple-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-purple-900 text-center"
                  // onClick={() => handleCodeButtonClick(item.code)}
                  href={item.url}
                  target="_blank"
                    rel="noreferrer"
                >
                  Code
                </a>
                {item.demo && (
                  <a
                    className="inline-block text-white bg-purple-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-purple-900 text-center"
                    href={item.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo
                  </a>
                )}
              </div>
              {item.note && (
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {item.note}
                </div>
              )}
            </div>
          </div>
  )
}

export default ProjectCard
