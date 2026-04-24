import { DownloadFile } from "@utils/Functions";
import type { NoteCardProps } from "@Type";

const Card = ({ item }: NoteCardProps) => {

  return (
    <div
      className="w-full max-w-[300px] h-[310px] rounded-lg border shadow-md bg-slate-800 border-black flex flex-col items-center p-4 sm:p-6 overflow-hidden"
      data-aos="zoom-in"
    >
      {/* Image Section */}
      <img
        src={`${item.note_image_url}`}
        className="mb-4 w-[7rem] h-[7rem] object-cover"
      />

      {/* Title */}
      <h5 className="mb-1 text-xl font-medium text-white text-center">
        {item.title}
      </h5>

      {/* Description (Fixed Size) */}
      <span className="text-xs sm:text-sm text-gray-400 text-center w-full line-clamp-3 overflow-hidden">
        {item.description}
      </span>

      {/* Button Section (Sticks to Bottom) */}
      <div className="mt-auto w-full flex justify-center">
        <a
          className="text-white bg-purple-700 rounded-full px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-purple-900 text-center"
          onClick={() => DownloadFile(item.note_pdf_url, item.title)}
          rel="noreferrer"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default Card;
