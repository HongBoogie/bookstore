"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BookList from "@components/BookList";
// import BookSearchForm from "@components/BookSearchForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BooksContainer() {
  const [page, setPage] = useState(1);

  const fetchBooks = async () => {
    const response = await fetch(`/api/books?page=${page}`);
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", page],
    queryFn: fetchBooks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto p-4 w-3/4">
      <Card className="w-full h-full">
        <CardContent className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">책 목록</h1>
            <Link href="/new">
              <Button>새 책 추가</Button>
            </Link>
          </div>

          {/* <BookSearchForm
            onSearch={(searchTerm) => {
              setSearch(searchTerm);
              setPage(1);
            }}
          /> */}

          <BookList books={data.books} />

          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              이전 페이지
            </Button>
            <span>
              페이지 {page} / {data.totalPages}
            </span>
            <Button
              onClick={() =>
                setPage((prev) => (prev < data.totalPages ? prev + 1 : prev))
              }
              disabled={page === data.totalPages}
            >
              다음 페이지
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
