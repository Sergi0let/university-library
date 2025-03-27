"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  color: string;
  coverImage: string;
}

const BookCover = ({ className, variant = "regular", color = "#012B48", coverImage }: Props) => {
  return (
    <div className={cn("relative transition-all duration-300 ease-in-out", variantStyles[variant], className)}>
      <BookCoverSvg coverColor={color} />
      <div className="absolute z-10" style={{ left: "12%", width: "87.5%", height: "88%" }}>
        <IKImage
          path={coverImage}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book Cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{ active: true }}
        />
      </div>
    </div>
  );
};

export default BookCover;
