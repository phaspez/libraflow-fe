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
import { watch } from 'vue'
import axios from 'axios'

const props = defineProps({
	book: {
		type: Object as PropType<Book>,
		required: true,
	},
})

const { title, image, _id, description } = props.book
</script>

<template>
	<Card
		class="w-full overflow-clip shadow-sm hover:shadow-2xl dark:shadow-white smooth_transition"
	>
		<div class="w-full h-60">
			<RouterLink :to="`/books/${_id}`">
				<img :src="image" alt="Card Image" />
			</RouterLink>
		</div>
		<div class="p-1 pt-0 text-center">
      <RouterLink :to="`/books/${_id}`">
			  <h4>{{ title || 'Unnamed Item' }}</h4>
      </RouterLink>
		</div>
    <div class="p-4">
		<p class="line-clamp-2"> {{ description }} </p>
    </div>
	</Card>
</template>

<style scoped>
img {
	@apply bg-center object-cover w-full h-full;
}

.smooth_transition {
	@apply transition-all duration-200;
}
</style>
