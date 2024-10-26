<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { Book } from '@/types'
import ItemCard from '@/components/ItemCard.vue'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const items = ref<Book[]>([])
const props = defineProps({
	title: {
		type: String,
		required: false,
		default: 'Dành cho bạn',
	},
})

onMounted(() => {
	axios.get(import.meta.env.VITE_BACKEND_URL + '/api/book').then((res) => {
		//items.value =
		items.value = getRandomItems(res.data.books as Book[], 6)
	})
})

function getRandomItems(array: Book[], count = 6) {
	if (array.length <= count) {
		return array
	}
	// Shuffle the array using Fisher-Yates algorithm
	const shuffled = array.slice()
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Swap elements
	}
	return shuffled.slice(0, count)
}
</script>

<template>
	<h2>{{ props.title }}</h2>
	<ScrollArea class="h-[484px] w-full rounded-md border p-4 bg-white dark:bg-black">
		<div class="flex gap-2 w-full">
			<ItemCard
				v-for="item in items"
				:key="item._id"
				class="h-[426px] w-[256px]"
				:book="item"
			/>
			<ScrollBar orientation="horizontal" class="h-4" />
		</div>
	</ScrollArea>
</template>

<style scoped></style>
