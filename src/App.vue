<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderNav from '@/components/HeaderNav.vue'
import { Toaster } from '@/components/ui/toast'
import Footer from '@/components/Footer.vue'
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
</script>

<template>
	<header
		class="sticky z-10 top-0 w-full px-2 md:px-10 lg:px-20 bg-white/85 dark:bg-black/50 backdrop-blur border-b border-black/50 dark:border-white/50"
	>
		<HeaderNav />
	</header>
	<main class="min-h-screen">
		<RouterView :key="$route.fullPath" />
	</main>
	<div
		class="fixed w-screen h-screen top-0 opacity-15 mix-blend-plus-darker -z-50 background dark:background-dark dark:mix-blend-difference"
	/>
	<footer class="z-10 w-full px-2 md:px-10 lg:px-20 bg-amber-50 dark:bg-slate-800">
		<Footer />
	</footer>
	<ScrollToTopButton />
	<Toaster />
</template>

<style>
.material-symbols-outlined {
	font-variation-settings:
		'FILL' 0,
		'wght' 400,
		'GRAD' 0,
		'opsz' 24;
}
</style>
