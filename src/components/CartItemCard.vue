<script setup lang="ts">
import type { Book, CartItem } from '@/types'
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import {
	NumberField,
	NumberFieldContent,
	NumberFieldDecrement,
	NumberFieldIncrement,
	NumberFieldInput,
} from '@/components/ui/number-field'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
type PropsCart = {
	cartItem: CartItem
	setItemQuantity: (id: string, quantity: number) => void
	clearItem: (id: string) => void
	setBookPrice: (id: string, price: number) => void
}

const props = defineProps<PropsCart>()
const emit = defineEmits<{
	(e: 'update:quantity', id: string, quantity: number): void
	(e: 'clear-item', id: string): void
	(e: 'update:price', id: string, price: number): void
}>()

//const { setItemQuantity, cart, clearItem } = useCart()
const book = ref<Book | undefined>()
const count = ref<number>(props.cartItem.quantity)
// dirty trick, i'm tired af
const isHidden = ref<boolean>(false)

watch(
	count,
	(value) => {
		console.log(value)
		props.setItemQuantity(props.cartItem.bookId, value)
	},
	{},
)

onMounted(() => {
	axios
		.get(import.meta.env.VITE_BACKEND_URL + '/api/book/' + props.cartItem.bookId)
		.then((res) => {
			book.value = res.data as Book
			console.log('emit: ', book.value.price)
			emit('update:price', props.cartItem.bookId, book.value.price || 0)
			props.setBookPrice(props.cartItem.bookId, book.value.price || 0)
		})
		.catch((err) => console.log(err))
})

const handleChange = (ev: any) => {
	console.log(parseInt(ev.target.value))
	let clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)
	count.value = clamp(parseInt(ev.target.value), 1, book.value?.inLibrary || 0)
}

const changeCount = (value: number) => {
	console.log(value)
	let clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)
	count.value = clamp(value, 1, book.value?.inLibrary || 0)
}
</script>

<template>
	<div :class="`flex gap-2 w-full ${isHidden ? 'hidden' : ''}`">
		<router-link :to="`/books/${book?._id}`">
			<img :src="book?.image" class="max-w-32 rounded-lg" />
		</router-link>
		<div class="grid h-full w-full">
			<router-link :to="`/books/${book?._id}`">
				<h4 class="w-full">{{ book?.title }}</h4>
			</router-link>
			<h5 v-if="book?.price">
				{{ book.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
			</h5>
			<div class="flex gap-2 items-end">
				<div>
					<Label for="count">Số lượng</Label>
					<div class="flex items-center">
						<Button
							class="sharp-right aspect-square"
							variant="outline"
							:disabled="count == 1"
							@click="changeCount(count - 1)"
							><span class="material-symbols-outlined"> remove </span></Button
						>
						<Input
							class="rounded-none -z-0"
							id="count"
							type="number"
							:min="1"
							@change="handleChange"
							:max="book?.inLibrary || 1"
							:v-model="count"
							:model-value="count"
						/>
						<Button
							class="sharp-left aspect-square"
							:disabled="count === book?.inLibrary"
							variant="outline"
							@click="changeCount(count + 1)"
							><span class="material-symbols-outlined"> add </span></Button
						>
					</div>
				</div>
				<Button
					variant="ghost"
					class="aspect-square"
					@click="clearItem(props.cartItem.bookId)"
				>
					<span class="material-symbols-outlined"> delete </span>
				</Button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.sharp-left {
	@apply rounded-l-none;
}

.sharp-right {
	@apply rounded-r-none -z-0;
}
</style>
