import Link from "next/link";
import { Book } from "@/types/books";
import { Card } from "@components/ui/card";

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <Link key={book._id} href={`/books/${book._id}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <div className="p-4">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500">{book.genre}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
