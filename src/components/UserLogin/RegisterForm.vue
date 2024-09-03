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
import DatePicker from '@/components/ui/DatePicker.vue'

const formSchema = toTypedSchema(
	z
		.object({
			firstName: z.string().min(2, 'Tên phải chứa ít nhất 2 kí tự').max(50, 'Tên quá dài'),
			lastName: z.string().min(2, 'Họ phải chứa ít nhất 2 kí tự').max(50, 'Họ quá dài'),
			birthdate: z.date().optional(),
			address: z.string().optional(),
			phone: z
				.string()
				.regex(/^0\d+$/, 'Số điện thoại phải bắt đầu bằng 0')
				.min(10, 'Số điện thoại có ít nhất 10 số')
				.max(20, 'Số điện thoại không quá 20 số'),
			password: z
				.string()
				.min(6, 'Mật khẩu phải nhiều hơn 6 kí tự')
				.max(50, 'Mật khẩu quá dài'),
			confirmPassword: z.string().min(6).max(50),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Mật khẩu không trùng khớp',
			path: ['confirmPassword'],
		}),
)

const form = useForm({ validationSchema: formSchema })
const { toast } = useToast()

const onSubmit = form.handleSubmit(async (values) => {
	console.log(values)
	return
	await axios
		.post(import.meta.env.VITE_BACKEND_URL + '/api/user/register', values, {
			withCredentials: true,
		})
		.then((res) => {
			const data = res.data as LoginFormData
			toast({
				title: 'Đăng ký thành công :D',
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
				description: (err.response?.data as { message: string }).message || 'Error',
				variant: 'destructive',
			})
		})
})
</script>

<template>
	<h3 class="font-serif text-5xl font-normal">Đăng ký vào LibraFlow</h3>
	<p>Các trường có dấu * là các trường bắt buộc</p>
	<form @submit.prevent="onSubmit" class="p-2">
		<div class="py-2 flex gap-2">
			<FormField v-slot="{ field }" name="lastName">
				<FormItem>
					<FormLabel>Họ *</FormLabel>
					<FormControl>
						<Input type="text" required placeholder="Tên..." v-bind="field" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<FormField v-slot="{ field }" name="firstName">
				<FormItem>
					<FormLabel>Tên *</FormLabel>
					<FormControl>
						<Input type="text" required placeholder="Họ..." v-bind="field" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="py-2">
			<FormField v-slot="{ field }" name="phone">
				<FormItem>
					<FormLabel>Số điện thoại *</FormLabel>
					<FormControl>
						<Input type="text" required placeholder="Số điện thoại..." v-bind="field" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="py-2">
			<FormField v-slot="{ field }" name="address">
				<FormItem>
					<FormLabel>Địa chỉ</FormLabel>
					<FormControl>
						<Input type="text" placeholder="Password..." v-bind="field" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="py-2">
			<FormField v-slot="{ field }" name="birthdate">
				<FormItem>
					<FormLabel>Ngày sinh</FormLabel>
					<br />
					<DatePicker v-bind:="field" />
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="py-2">
			<FormField v-slot="{ field }" name="password">
				<FormItem>
					<FormLabel>Mật khẩu *</FormLabel>
					<FormControl>
						<Input type="text" required v-bind="field" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="py-2">
			<FormField v-slot="{ field }" name="confirmPassword">
				<FormItem>
					<FormLabel>Xác nhận mật khẩu *</FormLabel>
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
