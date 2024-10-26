<script setup lang="ts">
import { onMounted, watch } from 'vue'
import axios from 'axios'
import { ref } from 'vue'
import type { Author, Book, Publisher } from '@/types'
import ItemCard from '@/components/ItemCard.vue'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from '@/components/ui/select'
import {
	Pagination,
	PaginationEllipsis,
	PaginationFirst,
	PaginationLast,
	PaginationList,
	PaginationListItem,
	PaginationNext,
	PaginationPrev,
} from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRoute, useRouter } from 'vue-router'

const items = ref<Book[]>([])
const authors = ref<Author[]>([])
const publishers = ref<Publisher[]>([])

//const keywordSearch = ref<string>('')
const route = useRoute()
const router = useRouter()
const search = route.query.search
const page = route.query.page
const filter = ref<{ publisher?: string; author?: string; query?: string }>({})

const keywordSearch = ref(route.query.search?.toString() || '')
const currentPage = ref(parseInt(route.query.page?.toString() || '1'))
const totalPages = ref(1)
const totalBooks = ref(5)

onMounted(() => {
	axios.get(import.meta.env.VITE_BACKEND_URL + '/api/publisher').then((res) => {
		publishers.value = res.data as Publisher[]
	})
	axios.get(import.meta.env.VITE_BACKEND_URL + '/api/author').then((res) => {
		authors.value = res.data as Author[]
	})
	keywordSearch.value = search?.toString() || ''
	filter.value.query = search?.toString()
	filterBooks()
})

watch(
	[filter.value],
	() => {
		filterBooks()
	},
	{ deep: true },
)

watch(currentPage, () => {
	filterBooks()
})

const filterBooks = () => {
	const params = new URLSearchParams()
	if (filter.value.publisher) params.append('publisher', filter.value.publisher)
	if (filter.value.author) params.append('author', filter.value.author)
	if (filter.value.query) params.append('title', filter.value.query)
	if (currentPage.value) params.append('page', currentPage.value.toString())
	axios
		.get(import.meta.env.VITE_BACKEND_URL + '/api/book?' + params.toString())
		.then((res) => {
			items.value = res.data.books as Book[]
			currentPage.value = res.data.currentPage
			totalPages.value = res.data.totalPages
			totalBooks.value = res.data.totalBooks

			router.push({ query: { page: currentPage.value, search: keywordSearch.value } })
		})
		.catch((err) => console.log(err))
}

const updateKeyword = () => {
	//updatePagination(1)
	filter.value.query = keywordSearch.value
}

const clearFilter = () => {
	keywordSearch.value = ''
	filter.value = {}
	router.replace({ query: {} })
}

const updatePagination = (pg: number) => {
	//router.push({ query: { search: keywordSearch.value, page: pg } })
	//console.log(route.query)
	currentPage.value = pg
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
						<router-link to="/books" class="items-center flex gap-2"
							><span class="material-symbols-outlined"> book </span>Sách</router-link
						>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
		<div class="pb-4">
			<h1>Thư viện</h1>
		</div>
		<div class="flex items-center gap-2 py-2">
			<span class="material-symbols-outlined"> filter_list </span>
			<Input
				placeholder="Tìm kiếm bằng từ khóa..."
				v-model="keywordSearch"
				@update:modelValue="() => updatePagination(1)"
				@keyup.enter="updateKeyword"
			/>
			<Select v-model="filter.publisher">
				<SelectTrigger>
					<SelectValue placeholder="Theo nhà xuất bản" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem
							v-for="publisher in publishers"
							:key="publisher._id"
							:value="publisher._id"
						>
							{{ publisher.name }}
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select v-model="filter.author">
				<SelectTrigger>
					<SelectValue placeholder="Theo tác giả" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem v-for="author in authors" :key="author._id" :value="author._id">
						{{ author.name }}
					</SelectItem>
				</SelectContent>
			</Select>
			<Button
				@click="clearFilter"
				v-if="filter.publisher || filter.author || filter.query"
				variant="ghost"
			>
				<span class="material-symbols-outlined"> close </span>
			</Button>
			<span class="grow w-full" />
		</div>
		<div
			class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-1"
			v-if="items.length > 0"
		>
			<ItemCard v-for="item in items" :key="item._id" class="h-full" :book="item" />
		</div>
		<div v-else>
			<h1>Không tìm thấy sách!</h1>
			<p>Hãy thử tìm kiếm với từ khóa khác</p>
		</div>

		<Pagination
			v-slot="{ page }"
			:total="totalBooks"
			:sibling-count="1"
			show-edges
			@update:page="updatePagination"
			:default-page="currentPage"
			class="py-2"
		>
			<PaginationList v-slot="{ items }" class="flex items-center gap-1">
				<PaginationFirst />
				<PaginationPrev />

				<template v-for="(item, index) in items">
					<PaginationListItem
						v-if="item.type === 'page'"
						:key="index"
						:value="item.value"
						as-child
					>
						<Button
							class="w-10 h-10 p-0"
							:variant="item.value === page ? 'default' : 'outline'"
						>
							{{ item.value }}
						</Button>
					</PaginationListItem>
					<PaginationEllipsis v-else :key="item.type" :index="index" />
				</template>

				<PaginationNext />
				<PaginationLast />
			</PaginationList>
		</Pagination>
	</div>
</template>

<style scoped></style>
