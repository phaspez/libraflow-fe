<script setup lang="ts">
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
//import { useCart } from '@/hooks/useCart'
import CartItemCard from '@/components/CartItemCard.vue'
import { Button } from '@/components/ui/button'
import { computed, onMounted, ref, watch } from 'vue'
import type { CartItem } from '@/types'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'vue-router'
import axios from 'axios'

// cart
const cart = ref<CartItem[]>([])
const { user } = useUser()
const router = useRouter()

onMounted(() => {
	if (!user) {
		router.push({ name: 'home' })
	}

	const cartData = localStorage.getItem('cart')
	if (cartData) {
		cart.value = JSON.parse(cartData)
	} else {
		cart.value = []
	}
})

watch(
	cart,
	(newCart) => {
		console.log('changed')
		console.log(newCart)
		saveItemsInCart(newCart)
	},
	{ deep: true },
)

const totalValue = computed(() => {
	console.log('in total value')
	console.log(cart.value)
	const total = cart.value.reduce((acc, item) => {
		const price = item.pricePerBook || 0
		const quantity = item.quantity || 0
		console.log(`Item: ${item.bookId}, Price: ${price}, Quantity: ${quantity}`)
		return acc + price * quantity
	}, 0)
	console.log(`Total Value: ${total}`)
	return total
})

const setCart = (newCart: CartItem[]) => {
	cart.value = newCart
}
const setBookPrice = (id: string, price: number) => {
	console.log('set book id ', id, price)
	const newCart = cart.value.map((item) => {
		if (item.bookId === id) {
			return { bookId: id, pricePerBook: price, quantity: item.quantity }
		}
		return item
	})
	cart.value = newCart
	setCart(newCart)
}

const setItemQuantity = (id: string, quantity: number) => {
	const newCart = cart.value.map((item) => {
		if (item.bookId === id) {
			return { ...item, quantity }
		}
		return item
	})
	setCart(newCart)
}

const saveItemsInCart = (items: CartItem[]) => {
	localStorage.setItem('cart', JSON.stringify(items))
}

const clearAllItems = () => {
	localStorage.removeItem('cart')
	setCart([])
}

const clearItem = (id: string) => {
	const newCart = cart.value.filter((item) => item.bookId !== id)
	setCart(newCart)
}

const getItems = () => {
	return cart.value
}

const handleBorrowItems = () => {
	for (const item of cart.value) {
		for (let i = 0; i < item.quantity; i++) {
			console.log('Borrowing item: ', item.bookId)
			axios.post(import.meta.env.VITE_BACKEND_URL + '/api/borrow', {
				bookId: item.bookId,
				userId: user.value?.token,
			})
		}
	}
}
</script>

<template>
	<div class="view-container">
		<div>
			<Breadcrumb class="pt-4 lg:pt-0">
				<BreadcrumbList>
					<BreadcrumbItem>
						<router-link to="/" class="items-center flex gap-2"
							><span class="material-symbols-outlined"> home </span>Trang
							chủ</router-link
						>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<router-link to="/cart" class="items-center flex gap-2">
							<span class="material-symbols-outlined"> shopping_cart </span>Giỏ hàng
						</router-link>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
		<div class="flex flex-wrap w-full items-center">
			<h1>Giỏ hàng của tôi</h1>
			<div class="grow" />
			<div class="flex flex-wrap items-baseline gap-4">
				<h2>
					{{
						totalValue.toLocaleString('vi-VN', {
							style: 'currency',
							currency: 'VND',
						})
					}}
				</h2>
				<p>tổng giá trị</p>
				<Button
					class="self-center aspect-square"
					variant="destructive"
					@click="clearAllItems()"
					><span class="material-symbols-outlined"> delete_forever </span>
				</Button>
				<Button class="self-center items-center gap-2" @click="handleBorrowItems">
					<span class="material-symbols-outlined"> shopping_cart_checkout </span> Đặt mượn
					ngay
				</Button>
			</div>
		</div>
		<!--		<div class="flex items-center gap-2 py-2"></div>-->
		<div class="grid md:grid-cols-2 gap-1">
			<CartItemCard
				v-for="item in getItems()"
				:cart-item="item"
				@update:quantity="setItemQuantity"
				@update:price="setBookPrice"
				@clearItem="clearItem"
				:clear-item="clearItem"
				:set-item-quantity="setItemQuantity"
				:set-book-price="setBookPrice"
				:key="item.bookId"
			/>
		</div>
		<div
			v-if="getItems().length == 0"
			class="w-full grid grid-cols-1 justify-items-center gap-4 text-center p-2 bg-slate-700/10 rounded-lg"
		>
			<h1 class="text-black/50 dark:text-white/50">Giỏ hàng của bạn đang trống!</h1>
			<p class="text-black/50 dark:text-white/50">Hãy thêm sách vào đề tiếp tục</p>
			<img class="opacity-50" src="/paper-cut-books.png" />
		</div>
	</div>
</template>

<style scoped>
.bg-mail {
	background-image: url(public/mail.jpg);
	object-fit: contain;
}

.banner {
	@apply bg-gradient-to-t from-transparent via-white to-white dark:via-[#020817] dark:to-[#020817];
}
</style>
