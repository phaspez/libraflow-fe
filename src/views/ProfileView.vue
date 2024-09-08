<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { Book, User } from '@/types'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useRouter } from 'vue-router'
import UserForm from '@/components/UserLogin/UserForm.vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import ProfileCard from '@/components/ProfileCard.vue'
import { useToast } from '@/components/ui/toast'

const user = ref<User>()
const router = useRouter()
const { toast } = useToast()

onMounted(() => {
	axios
		.get(import.meta.env.VITE_BACKEND_URL + '/api/user/me', { withCredentials: true })
		.then((res) => {
			user.value = res.data as User
		})
		.catch((err) => {
			router.push({ name: 'home' })
		})
})

const handleUpdate = async (values: any) => {
	axios
		.patch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + user.value!._id, values, {
			withCredentials: true,
		})
		.then((res) => {
			toast({
				title: 'Cập nhật thông tin thành công :D',
				description: res.data.message || '',
				variant: 'default',
			})
			window.location.href = '/'
		})
		.catch((err) => {
			toast({
				title: 'Cập nhật thông tin thất bại :(',
				description:
					(err.response?.data as { message: string }).message ||
					'This is a toast message',
				variant: 'destructive',
			})
		})
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
						<router-link to="/books" class="items-center flex gap-2">
							<i class="fa-solid fa-user"></i>Trang cá nhân</router-link
						>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
		<h2>Xin chào, {{ user?.firstName + ' ' + user?.lastName }}!</h2>

		<Tabs default-value="account">
			<TabsList>
				<TabsTrigger value="account"> Tài khoản </TabsTrigger>
				<TabsTrigger value="update"> Cập nhật thông tin </TabsTrigger>
			</TabsList>
			<TabsContent value="account"> <ProfileCard v-if="user" :user="user" /> </TabsContent>
			<TabsContent value="update"
				><UserForm v-if="user" :handle-update="handleUpdate" :initial-value="user" />
			</TabsContent>
		</Tabs>
	</div>
</template>

<style scoped></style>
