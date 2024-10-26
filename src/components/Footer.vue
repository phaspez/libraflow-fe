<script setup lang="ts"></script>

<template>
	<div class="w-full items-center gap-3 p-2 py-5">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-x-4">
			<div class="flex items-center gap-2 lg:col-span-2">
				<span class="material-symbols-outlined"> library_books </span>
				<RouterLink to="/" class="font-serif text-2xl">LibraFlow</RouterLink>
				<span class="grow" />
			</div>
			<div class="grid grid-cols-1">
				<RouterLink to="/books" class="link"
					><span class="material-symbols-outlined"> book </span>Sách
				</RouterLink>
				<RouterLink to="/books" class="link">
					<span class="material-symbols-outlined"> shopping_cart </span> Giỏ hàng
				</RouterLink>
			</div>
			<div class="lg:hidden" />
			<div class="grid grid-cols-1">
				<RouterLink to="/" class="link"
					><i class="fa-brands fa-facebook"></i>LibraFlow
				</RouterLink>
				<RouterLink to="/" class="link">
					<i class="fa-brands fa-twitter"></i> @libflowofficial
				</RouterLink>
			</div>
		</div>
		<div class="pt-2 text-md text-justify">
			<p class="font-serif italic">Đại học Cần Thơ - B2207541 - Trầm Tri Min</p>
			<p class="font-serif italic pr-20 lg:p-0">
				“A reader lives a thousand lives before he dies . . . The man who never reads lives
				only one.” - George R.R. Martin
			</p>
		</div>
	</div>
</template>

<style scoped>
.link {
	@apply font-serif text-xl flex items-center gap-2;
}
</style>
