"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooks } from "@/lib/admin/actions/book";
import { bookSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ColorPicker from "../ColorPIcker";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBooks(values);

    if (result) {
      toast.success("Success", {
        description: "Book created successfully",
      });

      router.push(`/admin/books/${(result as { data: { id: string } }).data.id}`);
    } else {
      toast.error("Error", {
        description: "An error occurred",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Book Title</FormLabel>
              <FormControl>
                <Input required placeholder="Book title" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Author</FormLabel>
              <FormControl>
                <Input required placeholder="Book author" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Genre</FormLabel>
              <FormControl>
                <Input required placeholder="Book genre" {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Rating</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book rating"
                  {...field}
                  className="book-form_input"
                  type="number"
                  min={1}
                  max={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Total copies</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Total copies"
                  {...field}
                  className="book-form_input"
                  type="number"
                  min={1}
                  max={10000}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Book Image</FormLabel>
              <FormControl>
                <FileUpload
                  accept="image/*"
                  type="image"
                  placeholder="Upload a book cover"
                  folder="books/covers"
                  variant="light"
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Primary Color</FormLabel>
              <FormControl>
                <ColorPicker onPickerChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Book description</FormLabel>
              <FormControl>
                <Textarea placeholder="Book description" {...field} rows={5} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Book Trailer</FormLabel>
              <FormControl>
                <FileUpload
                  accept="video/*"
                  type="video"
                  placeholder="Upload a video trailer"
                  folder="books/videos"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-dark-500 text-base font-normal">Book summary</FormLabel>
              <FormControl>
                <Textarea placeholder="Book summary" rows={5} className="book-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="book-form_btn cursor-pointer text-white" type="submit">
          Add Book to Library
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
