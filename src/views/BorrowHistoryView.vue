<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import type { Borrow } from '@/types'
import BorrowCard from '@/components/BorrowCard.vue'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const borrows = ref<Borrow[]>([])

onMounted(() => {
	axios
		.get(import.meta.env.VITE_BACKEND_URL + '/api/borrow/my_borrows', {
			withCredentials: true,
		})
		.then((res) => {
			borrows.value = res.data as Borrow[]
			console.log(res.data)
			console.log(borrows.value)
		})
		.catch((err) => {
			console.log(err)
		})
})
</script>

<template>
	<div class="view-container">
		<Breadcrumb class="pt-4 lg:pt-0">
			<BreadcrumbList>
				<BreadcrumbItem>
					<router-link to="/" class="items-center flex gap-2"
						><span class="material-symbols-outlined"> home </span>Trang chủ</router-link
					>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<router-link to="/profile" class="items-center flex gap-2">
						<i class="fa-solid fa-user"></i>Trang cá nhân</router-link
					>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<span class="material-symbols-outlined"> history </span>
					Lịch sử mượn sách
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
		<h1>Lịch sử mượn sách</h1>
		<div class="grid gap-2 md:grid-cols-2">
			<BorrowCard :borrow="borrow" v-for="borrow in borrows" :key="borrow._id" />
		</div>
	</div>
</template>

<style scoped></style>
