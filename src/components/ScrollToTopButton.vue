<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'

const isVisible = ref(false)

const toggleVisibility = () => {
	if (window.scrollY > 300) {
		isVisible.value = true
	} else {
		isVisible.value = false
	}
}

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

onMounted(() => {
	window.addEventListener('scroll', toggleVisibility)
})

onUnmounted(() => {
	window.removeEventListener('scroll', toggleVisibility)
})
</script>

<template>
	<Button
		v-if="isVisible"
		@click="scrollToTop"
		class="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
	>
		<span class="material-symbols-outlined"> keyboard_arrow_up </span>
	</Button>
</template>

<style scoped>
button {
	z-index: 1000;
}
</style>
