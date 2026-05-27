'use client';

import Image from 'next/image';
import { DownloadFile } from '@utils/Functions';
import type { NoteCardProps } from '@Type';

const resolveAssetUrl = (...values: Array<string | undefined>) => {
  return values.find((value) => typeof value === 'string' && value.trim().length > 0)?.trim() ?? '';
};

const Card = ({ item }: NoteCardProps) => {
  const imageUrl = resolveAssetUrl(item.note_image_url, item.imageUrl);
  const pdfUrl = resolveAssetUrl(item.note_pdf_url, item.fileUrl);

  return (
    <div
      className="w-full max-w-none sm:max-w-75 min-h-50 sm:min-h-77.5 rounded-lg border shadow-md bg-slate-800 border-black flex flex-col items-center p-3 sm:p-6 overflow-hidden"
      data-aos="zoom-in"
    >
      {imageUrl ? (
        <div className="relative mb-2 sm:mb-4 w-16 h-16 sm:w-28 sm:h-28 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            unoptimized
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : null}

      <h5 className="mb-1 text-xs sm:text-xl font-medium text-white text-center leading-tight">
        {item.title}
      </h5>

      <span className="text-[9px] sm:text-sm text-gray-400 text-center w-full line-clamp-2 sm:line-clamp-3 overflow-hidden">
        {item.description}
      </span>

      <div className="mt-auto w-full flex justify-center">
        <button
          type="button"
          className="mt-1 text-white bg-purple-700 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm font-semibold cursor-pointer hover:bg-purple-900 text-center disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            if (pdfUrl) {
              DownloadFile(pdfUrl, item.title);
            }
          }}
          disabled={!pdfUrl}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Card;