<script setup>
import { useBookStore } from "../stores/book";
import { RouterLink } from "vue-router";

const bookStore = useBookStore();
</script>

<template>
  Book list View
  <div>
    <RouterLink :to="{ name: 'book-create' }">Create book</RouterLink>
    <ul>
      <li v-for="(book, index) in bookStore.books">
        {{ book.name }} , {{ book.author }}
        <RouterLink :to="{ name: 'book-edit', params: { id: index } }">
          <button>Edit</button>
        </RouterLink>

        <button @click="bookStore.removeBook(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>
