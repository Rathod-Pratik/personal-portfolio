import React from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from '../../../../Type/Types/Blog';
import { usePrivateObjectUrl } from '@utils/s3Upload';

interface CardProps {
  item: IBlog;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const coverImage = usePrivateObjectUrl(item.coverImage);

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
    >
      {/* Image */}
      <Link to={"/blog/" + item._id} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/20">
          <img
            src={coverImage}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase opacity-90"
                title={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug">
          <Link
            to={"/blog/" + item._id}
            className="outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            {item.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm/6 text-white/80">
          {item.excerpt && item.excerpt.length > 120
            ? item.excerpt.substring(0, 120) + "..."
            : item.excerpt}
        </p>

        <div className="mt-auto" />

        <div className="flex items-center justify-between pt-2">
          <Link
            to={"/blog/" + item._id}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 px-3 py-1.5 text-sm font-medium opacity-90 transition hover:opacity-100"
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Card;
