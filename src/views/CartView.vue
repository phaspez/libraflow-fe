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
import { onMounted, ref, watch } from 'vue'
import type { CartItem } from '@/types'

// cart
const cart = ref<CartItem[]>([])

onMounted(() => {
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

const setCart = (newCart: CartItem[]) => {
	cart.value = newCart
}

const getItemQuantiry = (id: string) => {
	const item = cart.value.find((item) => item.bookId === id)
	return item ? item.quantity : 0
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
		<div class="pb-4">
			<h1>Giỏ hàng của tôi</h1>
			<Button @click="clearAllItems()"> Xóa tất cả</Button>
		</div>
		<div class="flex items-center gap-2 py-2"></div>
		<div class="grid md:grid-cols-2 gap-1">
			<CartItemCard
				v-for="item in getItems()"
				:cart-item="item"
				:clear-item="clearItem"
				:set-item-quantity="setItemQuantity"
				:key="item.bookId"
			/>
		</div>
	</div>
</template>

<style scoped></style>
