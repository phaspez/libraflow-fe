<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { Book } from '@/types'

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
	<div class="p-4">
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
</style>
