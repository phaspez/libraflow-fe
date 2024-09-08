<script setup lang="ts">
import type { User } from '@/types'

const props = defineProps<{ user: User }>()

const { user } = props

function formatDate(dateString: string): string {
	const date = new Date(dateString)
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()
	return `${day}/${month}/${year}`
}
</script>

<template>
	<table class="max-w-max">
		<tbody>
			<tr class="m-0 border-t p-0 even:bg-muted">
				<td
					class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
				>
					Họ
				</td>
				<td
					class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
				>
					{{ user.lastName }}
				</td>
			</tr>
			<tr class="m-0 border-t p-0 even:bg-muted">
				<td
					class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
				>
					Tên
				</td>
				<td
					class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
				>
					{{ user.firstName }}
				</td>
			</tr>
			<tr class="m-0 border-t p-0 even:bg-muted">
				<td
					class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
				>
					Địa chỉ
				</td>
				<td
					class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
				>
					{{ user.address }}
				</td>
			</tr>
			<tr class="m-0 border-t p-0 even:bg-muted">
				<td
					class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
				>
					Sinh nhật
				</td>
				<td
					class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
				>
					{{ new Date(user.birthdate || '').toLocaleDateString() }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped></style>
