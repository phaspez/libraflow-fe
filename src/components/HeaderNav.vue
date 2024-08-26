<script setup lang="ts">
import ModeToggle from '@/components/ModeToggle.vue'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
import { Icon } from '@iconify/vue'
import { useUser } from '@/hooks/useUser'
import { deleteCookie } from '@/lib/utils'

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
		<RouterLink to="/" class="font-serif text-2xl">LibraFlow</RouterLink>
		<span class="grow" />
		<div v-if="!user">
			<RouterLink to="/login">
				<Button variant="outline"><Icon icon="radix-icons:enter"></Icon></Button>
			</RouterLink>
		</div>
		<div v-else class="flex items-center gap-2">
			<p>{{ `Xin chào, ${user.firstName} ${user.lastName}!` }}</p>
			<Button variant="outline" class="grid aspect-square"
				><Icon icon="radix-icons:person"></Icon
			></Button>
			<Button variant="destructive" @click="handleLogout" class="grid aspect-square"
				><Icon icon="radix-icons:exit"></Icon
			></Button>
		</div>
		<ModeToggle />
	</div>
</template>

<style scoped></style>
