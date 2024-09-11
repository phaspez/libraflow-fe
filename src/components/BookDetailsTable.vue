<script setup lang="ts">
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import type { PropType } from 'vue'
import type { Book } from '@/types'

const props = defineProps({
	book: {
		type: Object as PropType<Book>,
		required: false,
	},
})
</script>

<template>
	<Table>
		<TableBody>
			<TableRow>
				<TableCell>
					<p>Tác giả</p>
				</TableCell>
				<TableCell>
					<p>{{ book?.author?.name || 'Đang cập nhật' }}</p>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>
					<p>Số trang</p>
				</TableCell>
				<TableCell>
					<p>{{ book?.pageCount || 'Đang cập nhật' }}</p>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>
					<p>Nhà xuất bản</p>
				</TableCell>
				<TableCell>
					<p>{{ book?.publisher?.name || 'Đang cập nhật' }}</p>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>
					<p>Còn trong thư viện</p>
				</TableCell>
				<TableCell>
					<p>{{ book?.inLibrary || 'Đang cập nhật' }}</p>
				</TableCell>
			</TableRow>
		</TableBody>
	</Table>
</template>
