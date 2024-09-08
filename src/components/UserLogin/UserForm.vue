<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import { useToast } from '@/components/ui/toast'

import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'
import { FormControl, FormItem, FormLabel, FormMessage, FormField } from '@/components/ui/form'
import axios, { AxiosError } from 'axios'
import type { LoginFormData, User } from '@/types'
import { setCookie } from '@/lib/utils'
import { ref } from 'vue'
import DatePicker from '@/components/ui/DatePicker.vue'

type UserForm = {
	handleUpdate: (values: any) => Promise<void>
	initialValue: User
}

const props = defineProps<UserForm>()

const formSchema = toTypedSchema(
	z.object({
		firstName: z.string().min(2, 'Tên phải chứa ít nhất 2 kí tự').max(50, 'Tên quá dài'),
		lastName: z.string().min(2, 'Họ phải chứa ít nhất 2 kí tự').max(50, 'Họ quá dài'),
		birthdate: z.date().optional(),
		address: z.string().optional(),
	}),
)
const form = useForm({ validationSchema: formSchema, initialValues: props.initialValue })

const onSubmit = form.handleSubmit(async (values) => {
	props.handleUpdate(values)
})
</script>

<template>
	<form @submit.prevent="onSubmit" class="p-2">
		<div class="grid grid-cols-2 gap-2">
			<div class="py-4">
				<FormField v-slot="{ field }" name="lastName">
					<FormItem>
						<FormLabel>Họ</FormLabel>
						<FormControl>
							<Input
								type="text"
								required
								placeholder="Họ của bạn..."
								v-bind="field"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
			<div class="py-4">
				<FormField v-slot="{ field }" name="firstName">
					<FormItem>
						<FormLabel>Tên</FormLabel>
						<FormControl>
							<Input
								type="text"
								required
								placeholder="Tên của bạn..."
								v-bind="field"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
		</div>
		<div class="py-4">
			<FormField v-slot="{ field }" name="address">
				<FormItem>
					<FormLabel>Địa chỉ</FormLabel>
					<FormControl>
						<Input type="text" required placeholder="Địa chỉ..." v-bind="field" />
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
		<span class="py-5 h-10" />
		<Button type="submit" class="mt-10"> Cập nhật </Button>
	</form>
</template>

<style scoped></style>
