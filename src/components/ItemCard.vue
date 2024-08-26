<script setup lang="ts">
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { type Book } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
	book: {
		type: Object as PropType<Book>,
		required: true,
	},
})

const { title, description, image } = props.book
</script>

<template>
	<Card class="w-full">
		<div class="w-full h-60 bg-contain">
			<img :src="image" alt="Card Image" />
		</div>
		<div class="p-1 pt-0">
			<h4>{{ title || 'Unnamed Item' }}</h4>
			<CardDescription>{{ description || 'No description' }}</CardDescription>
		</div>
		<CardContent> Card Content </CardContent>
	</Card>
</template>

<style scoped>
img {
	@apply bg-center object-cover w-full h-full;
}
</style>
