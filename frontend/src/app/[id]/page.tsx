"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const response = await fetch(`/api/books?id=${bookId}`);

      return response.json();
    },
  });

  const queryClient = useQueryClient();

  const deleteBookMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/books?id=${bookId}`, {
        method: "DELETE",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      router.push("/");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>저자:</strong> {book.author}
          </p>
          <p>
            <strong>장르:</strong> {book.genre}
          </p>
          <p>
            <strong>설명:</strong> {book.description}
          </p>
          <p>
            <strong>가격:</strong> {book.price}원
          </p>

          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/books/${bookId}/edit`)}
            >
              수정
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteBookMutation.mutate()}
            >
              삭제
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
