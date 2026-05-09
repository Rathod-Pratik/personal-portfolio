import { DownloadFile } from "@utils/Functions";
import type { NoteCardProps } from "@Type";

const Card = ({ item }: NoteCardProps) => {

  return (
    <div
      className="w-full max-w-none sm:max-w-[300px] min-h-[200px] sm:min-h-[310px] rounded-lg border shadow-md bg-slate-800 border-black flex flex-col items-center p-3 sm:p-6 overflow-hidden"
      data-aos="zoom-in"
    >
      {/* Image Section */}
      <img
        src={item.note_image_url}
        className="mb-2 sm:mb-4 w-[4rem] h-[4rem] sm:w-[7rem] sm:h-[7rem] object-cover"
      />

      {/* Title */}
      <h5 className="mb-1 text-xs sm:text-xl font-medium text-white text-center leading-tight">
        {item.title}
      </h5>

      {/* Description (Fixed Size) */}
      <span className="text-[9px] sm:text-sm text-gray-400 text-center w-full line-clamp-2 sm:line-clamp-3 overflow-hidden">
        {item.description}
      </span>

      {/* Button Section (Sticks to Bottom) */}
      <div className="mt-auto w-full flex justify-center">
        <a
          className="mt-1 text-white bg-purple-700 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm font-semibold cursor-pointer hover:bg-purple-900 text-center"
          onClick={() => {
            if (item.note_pdf_url) {
              DownloadFile(item.note_pdf_url, item.title);
            }
          }}
          rel="noreferrer"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default Card;
