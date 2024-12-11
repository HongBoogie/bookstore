"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/books";

export default function NewBookPage() {
  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    author: "",
    publisher: "",
    publishedYear: new Date().getFullYear(),
    genre: "",
    description: "",
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const addBookMutation = useMutation({
    mutationFn: async (newBook: Book) => {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "책 추가 중 오류가 발생했습니다.");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.title || !book.author || !book.publisher) {
      alert("제목, 저자, 출판사는 필수 입력 항목입니다.");
      return;
    }

    addBookMutation.mutate(book);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>새 책 추가</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">제목</label>
              <Input
                value={book.title}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="책 제목을 입력하세요"
                required
              />
            </div>
            <div>
              <label className="block mb-2">저자</label>
              <Input
                value={book.author}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                placeholder="저자명을 입력하세요"
                required
              />
            </div>
            <div>
              <label className="block mb-2">출판사</label>
              <Input
                value={book.publisher}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    publisher: e.target.value,
                  }))
                }
                placeholder="출판사를 입력하세요"
                required
              />
            </div>
            <div>
              <label className="block mb-2">출판 연도</label>
              <Input
                type="number"
                value={book.publishedYear}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    publishedYear: Number(e.target.value),
                  }))
                }
                min={1800}
                max={new Date().getFullYear()}
                required
              />
            </div>
            <div>
              <label className="block mb-2">장르</label>
              <Input
                value={book.genre}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    genre: e.target.value,
                  }))
                }
                placeholder="장르를 입력하세요"
              />
            </div>
            <div>
              <label className="block mb-2">설명</label>
              <Textarea
                value={book.description}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="책에 대한 간단한 설명을 입력하세요"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={addBookMutation.isPending}
            >
              {addBookMutation.isPending ? "추가 중..." : "책 추가"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
