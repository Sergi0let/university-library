import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  if (books.length < 2) return;
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-light-100 text-4xl">{title}</h2>

      <ul className="book-list">
        {books.map((book, i) => (
          <BookCard key={book.title + i} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
