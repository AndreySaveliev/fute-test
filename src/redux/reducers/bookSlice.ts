import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: BookData = {
  pending: false,
  title: "",
  bookLoaded: 0,
  totalCount: 0,
  orderBy: "relevance",
  category: "all",
  books: [],
  bookById: {
    id: "",
    etag: "",
    selflink: "",
    volumeInfo: {
      title: "",
      authors: [],
      categories: [],
      publishedDate: "",
      pageCount: 0,
      imageLinks: {
        smallThumbnail: "",
        thumbnail: "",
      },
      language: "",
      description: "",
    },
  },
};

interface BookData {
  title: string;
  totalCount: number;
  category: string;
  orderBy: string;
  bookLoaded: number;
  books: Book[];
  bookById: Book;
  pending: boolean;
}

export interface Book {
  id: string;
  etag: string;
  selflink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    description: string;
    categories: string[];
    pageCount: number;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
  };
}

export const searchBooks = createAsyncThunk<
  { items: Book[]; totalItems: number },
  {
    title: string;
    orderBy: string;
    category: string;
    bookLoaded: number;
  }
>("book/search", async (data) => {
  if (data.category === "all") {
    data.category = "";
  }
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${data.title}+subject:${data.category}&startIndex=${data.bookLoaded}&maxResults=30&orderBy=${data.orderBy}&printType=books`,
    {
      headers: {
        "X-goog-api-key": "AIzaSyDo2wNNBLu-JFrbmZQpJi7s5aZScHJC04A",
      },
    }
  );
  let res;
  if (response.status === 200) {
    res = await response.json();
  }
  return res;
});

export const searchBookById = createAsyncThunk<Book, string>(
  "book/searchById",
  async (id: string) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`,
      {
        headers: {
          "X-goog-api-key": "AIzaSyDo2wNNBLu-JFrbmZQpJi7s5aZScHJC04A",
        },
      }
    );
    let res;
    if (response.status === 200) {
      res = await response.json();
    }
    return res;
  }
);

export const searchMore = createAsyncThunk<
  { items: Book[]; totalItems: number },
  {
    title: string;
    orderBy: string;
    category: string;
    bookLoaded: number;
  }
>("book/searchMore", async (data) => {
  if (data.category === "all") {
    data.category = "";
  }
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${data.title}+subject:${data.category}&startIndex=${data.bookLoaded}&maxResults=30&orderBy=${data.orderBy}&printType=books`,
    {
      headers: {
        "X-goog-api-key": "AIzaSyDo2wNNBLu-JFrbmZQpJi7s5aZScHJC04A",
      },
    }
  );
  let res;
  if (response.status === 200) {
    res = await response.json();
  }
  return res;
});

export const bookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {
    setBookName: (state, action) => {
      state.title = action.payload.value;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload.selected;
    },
    setCategory: (state, action) => {
      state.category = action.payload.selected;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchBooks.fulfilled, (state, action) => {
      state.books = action.payload.items;
      state.totalCount = action.payload.totalItems;
      state.bookLoaded = 30;
    });
    builder.addCase(searchBookById.fulfilled, (state, action) => {
      state.bookById = action.payload;
      state.pending = false;
    });
    builder.addCase(searchBookById.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(searchMore.fulfilled, (state, action) => {
      const books = [...state.books, ...action.payload.items];
      state.books = books;
      // state.totalCount = action.payload.totalItems;
      state.bookLoaded += 30;
      state.pending = false;
    });
    builder.addCase(searchMore.pending, (state) => {
      state.pending = true;
    });
  },
});

export const { setBookName, setOrderBy, setCategory } = bookSlice.actions;

export default bookSlice.reducer;
