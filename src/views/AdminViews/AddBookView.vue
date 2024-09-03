<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import { useToast } from '@/components/ui/toast'

import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'
import { FormControl, FormItem, FormLabel, FormMessage, FormField } from '@/components/ui/form'
import axios, { AxiosError } from 'axios'
import type { LoginFormData } from '@/types'
import { setCookie } from '@/lib/utils'
import { ref } from 'vue'

const formSchema = toTypedSchema(
	z.object({
		title: z.string(),
		author: z.string(),
		description: z.string(),
		inLibrary: z.number(),
		pageCount: z.number(),
		image: z.string().optional(),
		category: z.string().optional(),
		publishYear: z.number().optional(),
		publisher: z.string().optional(),
	}),
)

const form = useForm({ validationSchema: formSchema })
const { toast } = useToast()

const onSubmit = form.handleSubmit(async (values) => {
	console.log(values)
	const res = await axios
		.post(import.meta.env.VITE_BACKEND_URL + '/api/book/', values, {
			withCredentials: true,
		})
		.then((res) => {
			console.log(import.meta.env.BACKEND_URL)
			const data = res.data as LoginFormData
			toast({
				title: 'Thêm sách thành công :D',
				description: res.data.message || '',
				variant: 'default',
			})
			setCookie('id', data.token, 14)
			setTimeout(() => (window.location.href = '/'), 1000)
		})
		.catch((err: AxiosError) => {
			console.log(err)
			toast({
				title: 'Thêm sách thất bại :(',
				description:
					(err.response?.data as { message: string }).message ||
					'This is a toast message',
				variant: 'destructive',
			})
		})
})

const imageUrl = ref<string | null>(null)
const handleFileChange = (event: Event) => {
	const file = (event.target as HTMLInputElement).files?.[0]
	if (file) {
		imageUrl.value = URL.createObjectURL(file)
	}
}
</script>

<template>
	<h3 class="font-serif text-5xl font-normal">Thêm sách</h3>
	<form @submit.prevent="onSubmit" class="p-2">
		<div class="py-4">
			<FormField v-slot="{ field }" name="title">
				<FormItem>
					<FormLabel>Tựa sách</FormLabel>
					<FormControl>
						<Input type="text" required placeholder="Phone number..." v-bind="field" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="py-4">
			<FormField v-slot="{ field }" name="description">
				<FormItem>
					<FormLabel>Giới thiệu sách</FormLabel>
					<FormControl>
						<Input type="text" placeholder="..." v-bind="field" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="grid md:grid-cols-2 gap-2">
			<div class="py-4">
				<FormField v-slot="{ field }" name="author">
					<FormItem>
						<FormLabel>Tác giả</FormLabel>
						<FormControl>
							<Input type="text" required placeholder="Password..." v-bind="field" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
			<div class="py-4">
				<FormField v-slot="{ field }" name="publisher">
					<FormItem>
						<FormLabel>Nhà xuất bản</FormLabel>
						<FormControl>
							<Input type="text" required placeholder="..." v-bind="field" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
			<div class="py-4">
				<FormField v-slot="{ field }" name="inLibrary">
					<FormItem>
						<FormLabel>Số trong kho</FormLabel>
						<FormControl>
							<Input type="number" placeholder="..." v-bind="field" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
			<div class="py-4">
				<FormField v-slot="{ field }" name="uploads">
					<FormItem>
						<FormLabel>Ảnh</FormLabel>
						<FormControl>
							<Input
								type="file"
								accept="image/*"
								placeholder="..."
								@change="handleFileChange"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<div v-if="imageUrl">
					<img :src="imageUrl" alt="Preview" class="mt-4 max-w-52" />
				</div>
			</div>
			<div class="py-4">
				<FormField v-slot="{ field }" name="pageCount">
					<FormItem>
						<FormLabel>Số trang</FormLabel>
						<FormControl>
							<Input type="number" placeholder="..." v-bind="field" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
		</div>
		<span class="py-5 h-10" />
		<Button type="submit" class="mt-10"> Submit </Button>
	</form>
</template>

<style scoped></style>
