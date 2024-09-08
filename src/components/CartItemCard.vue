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
import { useCart } from '@/hooks/useCart'
type PropsCart = {
	cartItem: CartItem
	setItemQuantity: (id: string, quantity: number) => void
	clearItem: (id: string) => void
}

const props = defineProps<PropsCart>()

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
		})
		.catch((err) => console.log(err))
})

const handleChange = (ev: any) => {
	let clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)
	count.value = clamp(parseInt(ev.target.value), 1, book.value?.inLibrary || 0)
}

const changeCount = (value: number) => {
	let clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)
	count.value = clamp(value, 1, book.value?.inLibrary || 0)
}
</script>

<template>
	<div :class="`flex gap-2 w-full ${isHidden ? 'hidden' : ''}`">
		<img :src="book?.image" class="max-w-32 rounded-lg" />
		<div class="grid h-full w-full">
			<h4 class="w-full">{{ book?.title }}</h4>
			<div class="flex gap-2 items-end">
				<NumberField
					id="count"
					:default-value="props.cartItem.quantity"
					:min="1"
					@change="handleChange"
					:max="book?.inLibrary"
				>
					<Label for="count">Số lượng</Label>
					<NumberFieldContent>
						<NumberFieldDecrement @click="changeCount(count - 1)" />
						<NumberFieldInput />
						<NumberFieldIncrement @click="changeCount(count + 1)" />
					</NumberFieldContent>
				</NumberField>
				<Button variant="destructive" @click="clearItem(props.cartItem.bookId)">
					<span class="material-symbols-outlined"> delete </span>
				</Button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
