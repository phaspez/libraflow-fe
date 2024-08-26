<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderNav from '@/components/HeaderNav.vue'
import { Toaster } from '@/components/ui/toast'
</script>

<template>
	<header class="sticky top-0 w-full px-20 bg-amber-50 dark:bg-slate-800">
		<HeaderNav />
	</header>
	<main class="pt-14 px-2 md:px-10 lg:px-20">
		<RouterView />
	</main>
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
