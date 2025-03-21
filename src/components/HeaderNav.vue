<script setup lang="ts">
import ModeToggle from '@/components/ModeToggle.vue'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
import { Icon } from '@iconify/vue'
import { useUser } from '@/hooks/useUser'
import { deleteCookie } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import SearchBar from '@/components/SearchBar.vue'

const { user } = useUser()

const handleLogout = () => {
	toast({
		title: 'Đã đăng xuất',
		description: 'Hẹn gặp lại bạn!',
		variant: 'default',
	})
	deleteCookie('id')
	setTimeout(() => window.location.reload(), 1000)
}
</script>

<template>
	<div class="flex w-full items-center gap-3 p-2">
		<span class="material-symbols-outlined"> library_books </span>
		<RouterLink to="/" class="font-serif text-2xl pr-8">LibraFlow</RouterLink>
		<div class="items-center hidden lg:flex">
			<RouterLink to="/books" class="flex gap-2"
				><span class="material-symbols-outlined"> book </span> Sách
			</RouterLink>
		</div>
		<span class="grow" />
		<SearchBar />
		<div class="hidden md:flex gap-3">
			<Button v-if="!user" variant="outline" class="aspect-square">
				<RouterLink to="/login" class="aspect-square">
					<span class="material-symbols-outlined"> login </span>
				</RouterLink>
			</Button>
			<div v-else class="flex items-center gap-2">
				<p class="hidden md:block"></p>
				<DropdownMenu>
					<DropdownMenuTrigger as-child>
						<Button variant="outline" class="aspect-square"
							><i class="fa-solid fa-user"></i
						></Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>{{
							`Xin chào, ${user.firstName} ${user.lastName}!`
						}}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<RouterLink to="/profile">
							<DropdownMenuItem>Thông tin cá nhân</DropdownMenuItem>
						</RouterLink>
						<RouterLink to="/history">
							<DropdownMenuItem>Lịch sử mượn sách</DropdownMenuItem>
						</RouterLink>
						<DropdownMenuSeparator />
						<DropdownMenuItem @click="handleLogout" class="text-red-400"
							>Đăng xuất</DropdownMenuItem
						>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<Button v-if="user" class="aspect-square" variant="outline">
				<RouterLink to="/cart" class="aspect-square">
					<span class="material-symbols-outlined"> shopping_cart </span>
				</RouterLink>
			</Button>
			<ModeToggle />
		</div>
		<div class="flex md:hidden">
			<span class="grow" />
			<DropdownMenu>
				<DropdownMenuTrigger as-child>
					<Button variant="outline" class="aspect-square"
						><i class="fa-solid fa-bars"></i
					></Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{{
						`Xin chào, ${user?.firstName} ${user?.lastName}!`
					}}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<RouterLink to="/profile">
						<DropdownMenuItem
							><span class="flex gap-2 items-center"
								><i class="fa-solid fa-user"></i> Thông tin cá nhân</span
							></DropdownMenuItem
						>
					</RouterLink>
					<RouterLink to="/cart">
						<DropdownMenuItem
							><span class="flex gap-2 items-center"
								><i class="fa-solid fa-cart-shopping"></i> Xem giỏ hàng</span
							></DropdownMenuItem
						>
					</RouterLink>
					<RouterLink to="/history">
						<DropdownMenuItem
							><span class="flex gap-2 items-center"
								><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử mượn
								sách</span
							></DropdownMenuItem
						>
					</RouterLink>
					<DropdownMenuSeparator />
					<DropdownMenuItem @click="handleLogout" class="text-red-400"
						>Đăng xuất</DropdownMenuItem
					>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
</template>

<style scoped></style>
