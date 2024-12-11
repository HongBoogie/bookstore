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
      "리액트 애플리케이션 개발의 모든 것을 배우는 필독서로, 초보부터 전문가까지 폭넓은 내용을 제공합니다.",
    genre: "프로그래밍",
  },
  {
    id: "3",
    title: "데이터 과학 입문",
    author: "한수정",
    publisher: "한빛미디어",
    publishedYear: 2021,
    description:
      "데이터 과학의 기초부터 실전 활용법까지 담아낸 책으로, 초보자를 위한 친절한 가이드입니다.",
    genre: "데이터 사이언스",
  },
  {
    id: "4",
    title: "알고리즘 문제 해결",
    author: "김철수",
    publisher: "동아출판",
    publishedYear: 2020,
    description:
      "효율적인 알고리즘 설계를 위한 기본 개념과 문제 해결 전략을 체계적으로 정리한 책입니다.",
    genre: "컴퓨터 과학",
  },
  {
    id: "5",
    title: "디자인 패턴",
    author: "에릭 감마",
    publisher: "피어슨",
    publishedYear: 2015,
    description:
      "소프트웨어 디자인에서 반복적으로 발생하는 문제를 해결하기 위한 디자인 패턴의 실무적 활용을 다룹니다.",
    genre: "프로그래밍",
  },
  {
    id: "6",
    title: "인공지능 개론",
    author: "박영희",
    publisher: "경문사",
    publishedYear: 2019,
    description:
      "인공지능의 역사와 이론, 최신 기술에 대한 입문서로, 인공지능의 기초를 배우기 위한 책입니다.",
    genre: "인공지능",
  },
  {
    id: "7",
    title: "네트워크 프로그래밍",
    author: "최민수",
    publisher: "한국컴퓨터",
    publishedYear: 2018,
    description:
      "네트워크 프로그래밍의 이론과 실습을 통해 실무에서의 활용을 돕는 실전 가이드입니다.",
    genre: "네트워크",
  },
  {
    id: "8",
    title: "타입스크립트 완전 정복",
    author: "이진솔",
    publisher: "위키북스",
    publishedYear: 2023,
    description:
      "타입스크립트의 기초부터 고급 활용까지, 효율적인 코드 작성을 위한 모든 것을 제공합니다.",
    genre: "프로그래밍",
  },
  {
    id: "9",
    title: "데이터베이스 기본",
    author: "김데이터",
    publisher: "이지스퍼블리싱",
    publishedYear: 2017,
    description:
      "데이터베이스의 기본 개념부터 설계와 최적화까지 다룬 실용적인 입문서입니다.",
    genre: "데이터베이스",
  },
  {
    id: "10",
    title: "머신러닝 입문",
    author: "최지능",
    publisher: "한빛아카데미",
    publishedYear: 2022,
    description:
      "머신러닝의 기본 이론과 실습을 다룬 책으로, 초보자에게 친숙한 가이드입니다.",
    genre: "인공지능",
  },
  {
    id: "11",
    title: "JavaScript 핵심 가이드",
    author: "모건 브라운",
    publisher: "오라일리",
    publishedYear: 2019,
    description:
      "JavaScript의 기본부터 고급 기술까지, 현대 웹 개발에 필수적인 모든 내용을 담았습니다.",
    genre: "프로그래밍",
  },
  {
    id: "12",
    title: "데이터 분석 실무",
    author: "정하나",
    publisher: "비제이퍼블릭",
    publishedYear: 2020,
    description:
      "실제 데이터를 활용한 분석 사례를 통해 데이터 분석 기술을 익힐 수 있는 실무서입니다.",
    genre: "데이터 사이언스",
  },
  {
    id: "13",
    title: "클라우드 컴퓨팅 개론",
    author: "유정민",
    publisher: "교학사",
    publishedYear: 2016,
    description:
      "클라우드 컴퓨팅의 원리와 활용법을 쉽게 이해할 수 있도록 구성된 입문서입니다.",
    genre: "클라우드",
  },
  {
    id: "14",
    title: "파이썬 데이터 분석",
    author: "크리스티안 힐",
    publisher: "한빛미디어",
    publishedYear: 2021,
    description:
      "파이썬을 활용한 데이터 분석과 시각화의 실무 사례를 담은 책입니다.",
    genre: "데이터 사이언스",
  },
  {
    id: "15",
    title: "컴퓨터 구조와 원리",
    author: "이동훈",
    publisher: "동아출판",
    publishedYear: 2015,
    description:
      "컴퓨터의 구조와 동작 원리를 상세히 설명한 컴퓨터 공학 전공 필독서입니다.",
    genre: "컴퓨터 과학",
  },
  {
    id: "16",
    title: "웹 개발 모던 자바스크립트",
    author: "장현수",
    publisher: "위키북스",
    publishedYear: 2022,
    description:
      "현대 웹 개발에서 자주 사용하는 JavaScript의 기법과 활용 사례를 설명합니다.",
    genre: "프로그래밍",
  },
  {
    id: "17",
    title: "컴퓨터 네트워크",
    author: "앤드류 탠넨바움",
    publisher: "피어슨",
    publishedYear: 2018,
    description:
      "컴퓨터 네트워크의 기본 원리와 프로토콜을 상세히 설명한 필독서입니다.",
    genre: "네트워크",
  },
  {
    id: "18",
    title: "소프트웨어 아키텍처",
    author: "마틴 파울러",
    publisher: "오라일리",
    publishedYear: 2020,
    description:
      "소프트웨어 설계와 아키텍처 원리를 다룬 실무 중심의 가이드입니다.",
    genre: "프로그래밍",
  },
  {
    id: "19",
    title: "AI 윤리와 법",
    author: "신희성",
    publisher: "한빛아카데미",
    publishedYear: 2021,
    description:
      "인공지능 기술의 윤리적, 법적 쟁점을 다룬 인문학적 접근서입니다.",
    genre: "인공지능",
  },
  {
    id: "20",
    title: "C++로 배우는 알고리즘",
    author: "박진수",
    publisher: "에이콘",
    publishedYear: 2023,
    description:
      "C++ 언어를 사용하여 알고리즘의 기초와 고급 기법을 설명한 실무서입니다.",
    genre: "프로그래밍",
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bookId = searchParams.get("id");

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
  const itemsPerPage = 10;

  const filteredBooks = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.genre.toLowerCase().includes(search)
  );

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
