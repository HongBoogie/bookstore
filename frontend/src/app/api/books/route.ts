import { mockBooks } from "@/mocks/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = (searchParams.get("search") || "").toLowerCase();
  const itemsPerPage = 5;

  // 검색 및 필터링
  const filteredBooks = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.genre.toLowerCase().includes(search)
  );

  // 페이지네이션
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  return NextResponse.json({
    books: paginatedBooks,
    totalPages: Math.ceil(filteredBooks.length / itemsPerPage),
    totalBooks: filteredBooks.length,
  });
}
