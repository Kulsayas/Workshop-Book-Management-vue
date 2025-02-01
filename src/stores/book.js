import { defineStore } from "pinia";

export const useBookStore = defineStore("book", {
  state: () => ({
    books: [
      {
        name: "Book name",
        author: "Moo-Deang",
      },
    ],
  }),
  actions: {
    addBook(bookData) {
      this.books.push(bookData);
    },
    removeBook(bookIndex) {
      this.books.splice(bookIndex, 1);
    },
    editBook(bookData, bookIndex) {
      this.books.splice(bookIndex, 1, bookData); //splice สามารถ update ค่าใน array ได้โดยใส่ parameter ตำแหน่งที่ 3 เข้าไปเพื่อ update
    },
  },
});
