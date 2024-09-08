<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { Book } from '@/types'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

const items = ref<Book[]>()

onMounted(() => {
	axios.get(import.meta.env.VITE_BACKEND_URL + '/api/book').then((res) => {
		items.value = res.data.books as Book[]
		console.log(items.value)
	})
})
</script>

<template>
	<div class="relative w-full overflow-clip h-44">
		<!-- Image -->
		<img
			class="absolute inset-0 w-full h-full object-cover object-center opacity-25 dark:opacity-50"
			src="@/assets/login.jpg"
			alt="Background"
		/>

		<!-- Text on top of the image -->
		<div class="absolute inset-0 flex flex-col px-4 lg:items-center justify-center">
			<h3 class="font-serif text-5xl font-normal">Chào mừng đến với LibraFlow</h3>
			<p class="text-lg">Một thư viện số nhanh chóng và thuận tiện</p>
		</div>
	</div>
	<div class="view-container">
		<h2>Khuyến mãi gần đây</h2>
		<div class="lg:mx-20">
			<Carousel class="rounded-lg">
				<CarouselContent class="rounded-lg">
					<CarouselItem
						><img class="carousel-img" src="/public/slide1.webp"
					/></CarouselItem>
					<CarouselItem
						><img class="carousel-img" src="/public/slide2.webp"
					/></CarouselItem>
					<CarouselItem
						><img class="carousel-img" src="../../public/slide3.jpg"
					/></CarouselItem>
				</CarouselContent>
				<CarouselPrevious class="hidden lg:block" />
				<CarouselNext class="hidden lg:block" />
			</Carousel>
		</div>
		<span class="flex items-center">
			<h2>Sách mới</h2>
			<span class="grow" />
			<router-link to="/books" class="link flex gap-2"
				>Xem thêm
				<span class="material-symbols-outlined"> north_east </span>
			</router-link>
		</span>
		<div
			class="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 gap-2 w-full"
		>
			<ItemCard v-for="item in items" class="h-full" :book="item" />
		</div>
	</div>
</template>

<style scoped>
.headline {
	background-image: url('@/assets/login.jpg');
	background-size: cover;
	background-position: center;
}

.carousel-img {
	@apply w-fit h-full rounded-lg object-center object-cover;
}
</style>
