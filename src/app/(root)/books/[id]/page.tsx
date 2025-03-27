import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "../../../../../database/drizzle";
import { books } from "../../../../../database/schema";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const [bookDetails] = await db.select().from(books).where(eq(books.id, id)).limit(1);

  if (!bookDetails) redirect("/404");

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails?.videoUrl as string} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="text-light-100 space-y-5 text-xl">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/* {SIMILAR} */}
      </div>
    </>
  );
};

export default Page;
