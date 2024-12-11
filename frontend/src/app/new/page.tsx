"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewBookPage() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    price: 0,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const addBookMutation = useMutation({
    mutationFn: async (newBook) => {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      router.push("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBookMutation.mutate(book as any);
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
              <label>제목</label>
              <Input
                value={book.title}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <label>저자</label>
              <Input
                value={book.author}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <label>장르</label>
              <Input
                value={book.genre}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    genre: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>설명</label>
              <Textarea
                value={book.description}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>가격</label>
              <Input
                type="number"
                value={book.price}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                required
              />
            </div>
            <Button type="submit" className="w-full">
              책 추가
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
