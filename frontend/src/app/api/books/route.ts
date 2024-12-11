import { NextRequest, NextResponse } from "next/server";
import { Book } from "@/types/books";

let mockBooks: Book[] = [
  {
    id: "1",
    title: "클린 코드",
    author: "로버트 C. 마틴",
    publisher: "인사이트",
    publishedYear: 2013,
    description:
      "소프트웨어 개발의 핵심을 다루는 필독서로, 좋은 코드를 작성하는 방법에 대한 심도 있는 가이드를 제공합니다.",
    genre: "프로그래밍",
  },
  {
    id: "2",
    title: "리액트 마스터",
    author: "조엘 하스",
    publisher: "에이콘",
    publishedYear: 2022,
    description:
      "소프트웨어 개발의 핵심을 다루는 필독서로, 좋은 코드를 작성하는 방법에 대한 심도 있는 가이드를 제공합니다.",
    genre: "프로그래밍",
  },
  {
    id: "3",
    title: "데이터 과학 입문",
    author: "한수정",
    publisher: "한빛미디어",
    publishedYear: 2021,
    description:
      "소프트웨어 개발의 핵심을 다루는 필독서로, 좋은 코드를 작성하는 방법에 대한 심도 있는 가이드를 제공합니다.",
    genre: "데이터 사이언스",
  },
  {
    id: "4",
    title: "알고리즘 문제 해결",
    author: "김철수",
    publisher: "동아출판",
    publishedYear: 2020,
    description:
      "소프트웨어 개발의 핵심을 다루는 필독서로, 좋은 코드를 작성하는 방법에 대한 심도 있는 가이드를 제공합니다.",
    genre: "컴퓨터 과학",
  },
  {
    id: "5",
    title: "디자인 패턴",
    author: "에릭 감마",
    publisher: "피어슨",
    publishedYear: 2015,
    description:
      "소프트웨어 개발의 핵심을 다루는 필독서로, 좋은 코드를 작성하는 방법에 대한 심도 있는 가이드를 제공합니다.",
    genre: "프로그래밍",
  },
  {
    id: "6",
    title: "인공지능 개론",
    author: "박영희",
    publisher: "경문사",
    publishedYear: 2019,
    genre: "인공지능",
  },
  {
    id: "7",
    title: "네트워크 프로그래밍",
    author: "최민수",
    publisher: "한국컴퓨터",
    publishedYear: 2018,
    genre: "네트워크",
  },
  {
    id: "8",
    title: "타입스크립트 완전 정복",
    author: "이진솔",
    publisher: "위키북스",
    publishedYear: 2023,
    genre: "프로그래밍",
  },
  {
    id: "9",
    title: "데이터베이스 기본",
    author: "김데이터",
    publisher: "이지스퍼블리싱",
    publishedYear: 2017,
    genre: "데이터베이스",
  },
  {
    id: "10",
    title: "머신러닝 입문",
    author: "최지능",
    publisher: "한빛아카데미",
    publishedYear: 2022,
    genre: "인공지능",
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bookId = searchParams.get("id");

  // 특정 책 ID로 조회 요청인 경우
  if (bookId) {
    const book = mockBooks.find((b) => b.id === bookId);

    if (!book) {
      return NextResponse.json(
        { error: "해당 ID의 책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  }

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

export async function POST(request: NextRequest) {
  try {
    const newBook = await request.json();

    const book: Book = {
      ...newBook,
      id: Date.now().toString(), // 간단한 ID 생성 방식
    };

    if (!book.title || !book.author || !book.publisher) {
      return NextResponse.json(
        { error: "필수 정보(제목, 저자, 출판사)를 입력해주세요." },
        { status: 400 }
      );
    }

    mockBooks.push(book);
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "책 추가 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedBook = await request.json();

    const index = mockBooks.findIndex((book) => book.id === updatedBook.id);

    if (index === -1) {
      return NextResponse.json(
        { error: "해당 ID의 책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (!updatedBook.title || !updatedBook.author || !updatedBook.publisher) {
      return NextResponse.json(
        { error: "필수 정보(제목, 저자, 출판사)를 입력해주세요." },
        { status: 400 }
      );
    }

    mockBooks[index] = { ...mockBooks[index], ...updatedBook };

    return NextResponse.json(mockBooks[index], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "책 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("id");

    if (!bookId) {
      return NextResponse.json(
        { error: "삭제할 책의 ID를 제공해주세요." },
        { status: 400 }
      );
    }

    const initialLength = mockBooks.length;
    mockBooks = mockBooks.filter((book) => book.id !== bookId);

    if (mockBooks.length === initialLength) {
      return NextResponse.json(
        { error: "해당 ID의 책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "책이 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "책 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
