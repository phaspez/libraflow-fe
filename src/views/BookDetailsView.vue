<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios, { type AxiosError } from 'axios'
import type { Book } from '@/types'
import BookDetailsTable from '@/components/BookDetailsTable.vue'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

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
	<div class="p-1 md:p-5 lg:p-10">
		<Breadcrumb class="pt-4 lg:pt-0">
			<BreadcrumbList>
				<BreadcrumbItem>
					<router-link to="/" class="items-center flex gap-2"
						><span class="material-symbols-outlined"> home </span>Trang chủ</router-link
					>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<router-link to="/books" class="items-center flex gap-2"
						><span class="material-symbols-outlined"> book </span>Sách</router-link
					>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage> {{ book?.title }}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
		<div class="grid md:grid-cols-4 gap-4 py-4">
			<div class="col-span-1 w-full items-center image-container">
				<img :src="book?.image" />
			</div>
			<div class="col-span-3">
				<h3>{{ book?.title }}</h3>
				<p>{{ book?.description }}</p>
				<div>
					<h4>Thông tin chi tiết</h4>
					<BookDetailsTable :book="book" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.image-container {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
