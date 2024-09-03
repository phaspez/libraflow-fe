<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderNav from '@/components/HeaderNav.vue'
import { Toaster } from '@/components/ui/toast'
</script>

<template>
	<header class="sticky z-10 top-0 w-full px-2 md:px-10 lg:px-20 bg-amber-50 dark:bg-slate-800">
		<HeaderNav />
	</header>
	<main class="">
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
