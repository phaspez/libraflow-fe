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

const formSchema = toTypedSchema(
	z.object({
		phone: z
			.string()
			.regex(/^0\d+$/)
			.min(10)
			.max(20),
		password: z.string().min(6).max(50),
	}),
)

const form = useForm({ validationSchema: formSchema })
const { toast } = useToast()

const onSubmit = form.handleSubmit(async (values) => {
	console.log(values)
	const res = await axios
		.post(import.meta.env.VITE_BACKEND_URL + '/api/user/login', values, {
			withCredentials: true,
		})
		.then((res) => {
			console.log(import.meta.env.BACKEND_URL)
			const data = res.data as LoginFormData
			toast({
				title: 'Đăng nhập thành công :D',
				description: res.data.message || '',
				variant: 'default',
			})
			setCookie('id', data.token, 14)
			setTimeout(() => (window.location.href = '/'), 1000)
		})
		.catch((err: AxiosError) => {
			console.log(err)
			toast({
				title: 'Đăng nhập thất bại :(',
				description:
					(err.response?.data as { message: string }).message ||
					'This is a toast message',
				variant: 'destructive',
			})
		})
})
</script>

<template>
	<h3 class="font-serif text-5xl font-normal">Đăng nhập vào LibraFlow</h3>
	<form @submit.prevent="onSubmit" class="p-2">
		<div class="py-4">
			<FormField v-slot="{ field }" name="phone">
				<FormItem>
					<FormLabel>Số điện thoại</FormLabel>
					<FormControl>
						<Input type="text" required placeholder="Phone number..." v-bind="field" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="py-4">
			<FormField v-slot="{ field }" name="password">
				<FormItem>
					<FormLabel>Mật khẩu</FormLabel>
					<FormControl>
						<Input type="text" required placeholder="Password..." v-bind="field" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<span class="py-5 h-10" />
		<Button type="submit" class="mt-10"> Submit </Button>
	</form>
</template>

<style scoped></style>
