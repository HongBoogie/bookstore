"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "@/types/books";

export default function BookEditPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = useSearchParams().get("bookId") as string;

  const {
    data: book,
    isLoading,
    error,
  } = useQuery<Book>({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const response = await fetch(`/api/books?id=${bookId}`);
      return response.json();
    },
  });

  const [formData, setFormData] = useState<Partial<Book>>({
    title: "",
    author: "",
    publisher: "",
    publishedYear: new Date().getFullYear(),
    genre: "",
    description: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        publisher: book.publisher || "",
        publishedYear: book.publishedYear || new Date().getFullYear(),
        genre: book.genre || "",
        description: book.description || "",
      });
    }
  }, [book]);

  const queryClient = useQueryClient();

  const updateBookMutation = useMutation<Book, Error, Partial<Book>>({
    mutationFn: async (updatedBook) => {
      const response = await fetch(`/api/books?id=${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedBook, id: bookId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "책 수정 중 오류가 발생했습니다.");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", bookId] });
      router.push(`/${bookId}`);
      alert("책 정보가 성공적으로 수정되었습니다.");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "publishedYear" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.publisher) {
      alert("제목, 저자, 출판사는 필수 입력 항목입니다.");
      return;
    }

    updateBookMutation.mutate(formData);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>책 정보 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">저자</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="publisher">출판사</Label>
              <Input
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="publishedYear">출판 연도</Label>
              <Input
                id="publishedYear"
                name="publishedYear"
                type="number"
                value={formData.publishedYear}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="genre">장르</Label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" disabled={updateBookMutation.isPending}>
                {updateBookMutation.isPending ? "수정 중..." : "수정"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/books/${bookId}`)}
              >
                취소
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
