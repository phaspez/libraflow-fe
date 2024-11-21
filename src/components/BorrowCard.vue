<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { Borrow } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'

type BorrowProp = {
	borrow: Borrow
}

const getDateString = (date: Date) => {
	return new Date(date).toLocaleTimeString() + ' ' + new Date(date).toLocaleDateString()
}

const props = defineProps<BorrowProp>()
</script>

<template>
	<div class="flex gap-2">
		<img class="rounded-lg w-36 object-contain" :src="borrow.book.image" />
		<div>
			<h4>{{ borrow.book.title }}</h4>
			<div class="flex gap-2 items-end">
				<div>
					<Label>Ngày mượn</Label>
					<p>{{ getDateString(borrow.borrowDate) }}</p>
				</div>
				<span class="material-symbols-outlined"> chevron_right </span>
				<div>
					<Label>Hạn trả</Label>
					<p>
						{{ getDateString(borrow.dueDate) }}
					</p>
				</div>
			</div>
			<Badge :variant="borrow.isAccepted ? 'default' : 'destructive'">
				{{ borrow.isAccepted ? 'Đã duyệt' : 'Chưa duyệt' }}
			</Badge>
			<Badge :variant="borrow.isReturned ? 'default' : 'destructive'">
				{{ borrow.isReturned ? 'Đã nhận' : 'Chưa nhận' }}
			</Badge>
			<p v-if="borrow.note">{{ borrow.note }}</p>
		</div>
	</div>
</template>

<style scoped></style>
