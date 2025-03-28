import { eq } from "drizzle-orm";
import Image from "next/image";
import { db } from "../../database/drizzle";
import { users } from "../../database/schema";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  if (!user) return null;

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message: availableCopies <= 0 ? "Book is not available" : "You are not eligible to borrow this book",
  };
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

        <BorrowBook bookId={id} userId={userId} borrowingEligibility={borrowingEligibility} />
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
