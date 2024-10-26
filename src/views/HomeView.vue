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
import RecommendBooks from '@/components/RecommendBooks.vue'

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
			class="absolute inset-0 w-full h-full object-cover object-center -z-10 brightness-75"
			src="@/assets/login.jpg"
			alt="Background"
		/>
		<div class="py-8 flex flex-col px-4 justify-center z-20 text-white">
			<h3 class="font-serif text-5xl hidden md:block">Chào mừng đến với LibraFlow</h3>
			<h3 class="font-serif text-5xl md:hidden">LibraFlow</h3>
			<p class="text-xl font-serif">Một thư viện số nhanh chóng và thuận tiện</p>
		</div>
		<!-- Text on top of the image -->
	</div>
	<div class="view-container">
		<h2>Khuyến mãi gần đây</h2>
		<div class="md:mx-30 lg:mx-44 xl:mx-64 py-4">
			<Carousel class="rounded-lg w-full items-center">
				<CarouselContent class="rounded-lg md:mx-20 lg:mx-24">
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
		<div class="py-4">
			<RecommendBooks title="Sách mới" />
		</div>
		<span class="flex items-center">
			<h2>Các sách được quan tâm</h2>
			<span class="grow" />
			<router-link to="/books" class="link flex gap-2"
				>Xem thêm
				<span class="material-symbols-outlined"> north_east </span>
			</router-link>
		</span>
		<div
			class="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-2 w-full"
		>
			<ItemCard v-for="item in items" :key="item._id" class="h-full" :book="item" />
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
	@apply w-fit h-full object-center object-cover rounded-lg;
}
</style>
