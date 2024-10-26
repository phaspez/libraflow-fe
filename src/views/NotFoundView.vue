<script setup lang="ts">
import { Button } from '@/components/ui/button'
import RecommendBooks from '@/components/RecommendBooks.vue'
</script>

<template>
	<div class="grid md:grid-cols-2 w-full p-10">
		<div class="flex items-center justify-center">
			<img class="max-w-[256px] dark:invert" src="/book-2029743_1280.png" alt="book" />
		</div>
		<div class="">
			<h1>404 - Không tìm thấy trang</h1>
			<p>Địa chỉ bạn đang tìm không tồn tại.</p>
			<RouterLink to="/">
				<Button class="my-4">Quay về trang chủ</Button>
			</RouterLink>
		</div>
	</div>
	<div class="px-10 py-5">
		<RecommendBooks title="Có phải bạn đang tìm?" />
	</div>
</template>

<style scoped></style>
