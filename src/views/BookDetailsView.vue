<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios, { type AxiosError } from 'axios'
import type { Book } from '@/types'
import BookDetailsTable from '@/components/BookDetailsTable.vue'

const route = useRoute()
const router = useRouter()
const bookId = route.params.id
let book = ref<Book>()

onMounted(() => {
	axios
		.get(import.meta.env.VITE_BACKEND_URL + '/api/book/' + bookId)
		.then((res) => {
			console.log(res.data)
			if (res.data) book.value = res.data as Book
			else router.push({ name: 'not-found' })
		})
		.catch((err: AxiosError) => {
			console.log(err)
			router.push({ name: 'not-found' })
		})
})
</script>

<template>
	<div class="grid grid-cols-4">
		<div class="col-span-1">
			<img :src="book?.image" />
		</div>
		<div class="col-span-3">
			<h3>{{ book?.title }}</h3>
			<p>{{ book?.description }}</p>
			<BookDetailsTable />
		</div>
	</div>
</template>

<style scoped></style>
