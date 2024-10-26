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
					<BreadcrumbItem> <i class="fa-solid fa-user"></i>Trang cá nhân </BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
		<div class="fixed right-0 top-0 -z-10 h-screen img">
			<img src="@/assets/bookshelf.jpg" alt="Login" class="w-full h-full object-cover" />
		</div>

		<div class="md:max-w-[400px]">
			<h1>Xin chào, {{ user?.firstName + ' ' + user?.lastName }}!</h1>
			<div class="py-2">
				<span class="flex gap-1 items-center"
					>Đi đến trang
					<RouterLink to="/history" class="flex gap-1 items-center link">
						Lịch sử mượn sách
						<span class="material-symbols-outlined"> arrow_outward </span></RouterLink
					></span
				>
			</div>
			<Tabs default-value="account">
				<TabsList>
					<TabsTrigger value="account"> Tài khoản </TabsTrigger>
					<TabsTrigger value="update"> Cập nhật thông tin </TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<ProfileCard v-if="user" :user="user" />
				</TabsContent>
				<TabsContent value="update"
					><UserForm v-if="user" :handle-update="handleUpdate" :initial-value="user" />
				</TabsContent>
			</Tabs>
		</div>
	</div>
</template>

<style scoped>
.img {
	@apply overflow-hidden w-full md:w-1/3 lg:w-1/2 md:brightness-75 md:opacity-80 hidden md:block;
}
</style>
