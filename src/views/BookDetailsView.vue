<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios, { type AxiosError } from 'axios'
import type { Book, CartItem } from '@/types'
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
import {
	NumberField,
	NumberFieldContent,
	NumberFieldDecrement,
	NumberFieldIncrement,
	NumberFieldInput,
} from '@/components/ui/number-field'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { useCart } from '@/hooks/useCart'
import { useUser } from '@/hooks/useUser'
import RecommendBooks from '@/components/RecommendBooks.vue'

const route = useRoute()
const router = useRouter()
const bookId = route.params.id
let book = ref<Book>()

const { toast } = useToast()
const { cart, getItemQuantiry, setItemQuantity } = useCart()
const { user } = useUser()

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

const countValue = ref(1)
const handleAddToCart = () => {
	let inCart = getItemQuantiry(book.value?._id || '')
	const excess = (inCart || 0) + countValue.value - (book.value?.inLibrary || 0)
	const title =
		excess > 0
			? `Số lượng đã thêm vượt quá số lượng sách còn lại trong thư viện`
			: `Đã thêm ${countValue.value}x ${book.value?.title || 'item'} vào giỏ!`
	toast({
		title: title,
		variant: 'default',
	})
	if (inCart > 0) {
		setItemQuantity(book.value?._id || '', inCart + countValue.value)
	} else {
		cart.value.push({
			bookId: book.value?._id || '',
			quantity: countValue.value,
		})
	}
}
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
		<div class="grid lg:grid-cols-4 gap-4 py-4">
			<div class="flex col-span-4 lg:col-span-1 w-full items-start image-container">
				<img class="rounded-lg" :src="book?.image" />
			</div>
			<div class="col-span-3">
				<h2>{{ book?.title }}</h2>
				<div v-if="book?.description">
					<h4>Mô tả</h4>
					<p class="py-4 px-1 text-justify" style="white-space: pre-wrap">
						{{ book?.description }}
					</p>
				</div>
				<div>
					<h2>{{ book?.price }} đ</h2>
					<div class="flex gap-2 items-end py-2">
						<NumberField
							id="count"
							v-model="countValue"
							:default-value="1"
							:min="1"
							:max="book?.inLibrary"
							:disabled="!user"
						>
							<Label for="count">Số lượng</Label>
							<NumberFieldContent>
								<NumberFieldDecrement />
								<NumberFieldInput />
								<NumberFieldIncrement />
							</NumberFieldContent>
						</NumberField>
						<Button :disabled="!user" @click="handleAddToCart" class="aspect-square"
							><span class="material-symbols-outlined">
								add_shopping_cart
							</span></Button
						>
					</div>
					<h4>Thông tin chi tiết</h4>
					<BookDetailsTable :book="book" />
				</div>
			</div>
		</div>
		<RecommendBooks />
	</div>
</template>

<style scoped>
.image-container {
	display: flex;
	justify-content: center;
	//align-items: center;
}
</style>
