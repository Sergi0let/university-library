import { Button } from "@/components/ui/button";
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

      {/* <BookList title="Borrow books" containerClassName="mt-6" /> */}
    </>
  );
};

export default Page;
