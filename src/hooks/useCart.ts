import { ref, onMounted, watch, computed } from 'vue'
import type { CartItem } from '@/types'

export function useCart() {
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

	return {
		cart: computed(() => cart.value),
		getItems,
		saveItemsInCart,
		clearItem,
		clearAllItems,
		getItemQuantiry,
		setItemQuantity,
	}
}
