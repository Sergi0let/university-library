import Image from "next/image";
import BookCover from "./BookCover";
import { Button } from "./ui/button";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
}: Book & { userId: string }) => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="text-light-200 font-semibold">{author}</span>
          </p>
          <p>
            Category: <span className="text-light-200 font-semibold">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="Star Icon" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        <Button className="book-overview_btn">
          <Image src="/icons/book.svg" alt="Book Icon" width={20} height={20} />
          <span className="font-bebas-neue text-dark-100 text-xl">Borrow Book</span>
        </Button>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative">
          <BookCover variant="wide" className="z-10" color={coverColor} coverImage={coverUrl} />

          <div className="absolute top-10 left-16 rotate-12 opacity-40 max-sm:hidden">
            <BookCover variant="wide" color={coverColor} coverImage={coverUrl} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
