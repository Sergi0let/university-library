"use client";

import { borrowBook } from "@/lib/actions/book";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: { message: string; isEligible: boolean };
}
const BorrowBook = ({ bookId, userId, borrowingEligibility: { isEligible, message } }: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (isEligible) {
      toast.error("Error", {
        description: message,
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast.success("Success", {
          description: "Book borrowed successfully",
        });

        router.push("/");
      } else {
        toast.error("error", { description: result.error });
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error", {
        description: "An Error occured while borrowing the book",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button className="book-overview_btn" onClick={handleBorrow} disabled={borrowing}>
      <Image src="/icons/book.svg" alt="Book Icon" width={20} height={20} />
      <span className="font-bebas-neue text-dark-100 text-xl">{borrowing ? "Borrowing..." : "Borrow book"}</span>
    </Button>
  );
};

export default BorrowBook;
