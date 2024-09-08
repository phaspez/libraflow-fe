<script setup lang="ts">
import {onMounted, watch} from 'vue'
import axios from 'axios'
import { ref } from 'vue'
import type {Author, Book, Publisher} from '@/types'
import ItemCard from '@/components/ItemCard.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

const items = ref<Book[]>([])
const authors = ref<Author[]>([])
const publishers = ref<Publisher[]>([])
const filter = ref<{publisher?: string, author?: string}>({})

onMounted(() => {
  axios.get(import.meta.env.VITE_BACKEND_URL + '/api/book').then((res) => {
    items.value = res.data.books as Book[]
    console.log(items.value)
  })
  axios.get(import.meta.env.VITE_BACKEND_URL + '/api/publisher').then((res) => {
    publishers.value = res.data as Publisher[]
    console.log(authors.value)
  })
  axios.get(import.meta.env.VITE_BACKEND_URL + '/api/author').then((res) => {
    authors.value = res.data as Author[]
    console.log(authors.value)
  })
})

watch(filter, (value) => {
  filterBooks()
}, {deep: true})

const filterBooks  = () => {
  let queryPub = filter.value.publisher ? `publisher=${filter.value.publisher}` : ''
  let queryAuth = filter.value.author ? `author=${filter.value.author}` : ''
  console.log(import.meta.env.VITE_BACKEND_URL + '/api/book?'+queryPub+'&'+queryAuth)
  axios.get(import.meta.env.VITE_BACKEND_URL + '/api/book?'+queryPub+'&'+queryAuth).then((res) => {
    items.value = res.data.books as Book[]
    console.log(items.value)
  }).catch((err) => console.log(err))
}

const clearFilter = () => {
  filter.value = {}
}

</script>

<template>
  <div class="view-container">
    <div>
      <Breadcrumb class="pt-4 lg:pt-0">
        <BreadcrumbList>
          <BreadcrumbItem>
            <router-link to="/" class="items-center flex gap-2"
            ><span class="material-symbols-outlined"> home </span>Trang
              chủ</router-link
            >
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <router-link to="/books" class="items-center flex gap-2"
            ><span class="material-symbols-outlined"> book </span>Sách</router-link
            >
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="pb-4">
      <h1>Thư viện</h1>
    </div>
    <div class="flex items-center gap-2 py-2">
      <span class="material-symbols-outlined">
        filter_list
      </span>
      <Select v-model="filter.publisher">
        <SelectTrigger>
          <SelectValue placeholder="Theo nhà xuất bản" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="publisher in publishers" :key="publisher._id" :value="publisher._id">
              {{ publisher.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select v-model="filter.author">
        <SelectTrigger>
          <SelectValue placeholder="Theo tác giả" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem v-for="author in authors" :key="author._id" :value="author._id">
              {{ author.name }}
            </SelectItem>
        </SelectContent>
      </Select>
      <Button @click="clearFilter" v-if="filter.publisher || filter.author" variant="ghost">
        <span class="material-symbols-outlined">
          close
        </span>
      </Button>
      <span class="grow w-full" />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
      <ItemCard v-for="item in items" :key="item._id" class="h-full" :book="item" />
    </div>
  </div>
</template>

<style scoped></style>
