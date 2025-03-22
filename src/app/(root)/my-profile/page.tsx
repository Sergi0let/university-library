import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { signOut } from "@/lib/auth";

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrow books" containerClassName="mt-6" books={sampleBooks} />
    </>
  );
};

export default Page;
