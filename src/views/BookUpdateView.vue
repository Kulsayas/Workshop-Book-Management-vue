<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

import { useBookStore } from "../stores/book";

const route = useRoute();
const router = useRouter();
const bookStore = useBookStore();

const bookData = reactive({
  name: "",
  author: "",
});

const mode = ref("create");
const bookIndex = ref(-1);

//ทำการดึง id มาก่อน
//ดึงข้อมูล book ออกมา
//เอาข้อมูลมาใส่ form ตัวเดิม
//เปลี่ยนจาก add เป็น update book
onMounted(() => {
  if (route.name === "book-edit") {
    mode.value = "update";
    bookIndex.value = parseInt(route.params.id); //รับ params มาก่อนเอาเก็บเข้าไปใน bookIndex
    const cBookStore = bookStore.books[bookIndex.value]; //ดึงข้อมูลเก่าของ bookstore ออกมาของ bookIndex
    bookData.name = cBookStore.name; //เอาข้อมูลมาใส่ form ตัวเดิม
    bookData.author = cBookStore.author;
  }
});

const addBook = () => {
  if (mode.value === "update") {
    bookStore.editBook(bookData, bookIndex.value); //เอาข้อมูลจาก reactive มา update editBook อีกทีนึง
  } else {
    bookStore.addBook(bookData);
  }
  router.push({
    name: "book-list",
  });
};

const displayButton = computed(() => {
  if (mode.value === "create") {
    return "Add";
  } else {
    return "Update";
  }
});
</script>

<template>
  Book Update View
  <div>
    <div>
      Book name
      <input type="text" v-model="bookData.name" />
    </div>
    <div>
      Book author
      <input type="text" v-model="bookData.author" />
    </div>
    <button @click="addBook()">{{ displayButton }} Book</button>
    <RouterLink :to="{ name: 'book-list' }">Back to home</RouterLink>
  </div>
</template>
