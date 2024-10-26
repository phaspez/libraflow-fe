<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline" class="aspect-square">
				<span class="material-symbols-outlined dark:hidden"> light_mode </span>
				<span class="material-symbols-outlined hidden dark:block"> dark_mode </span>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem @click="mode = 'light'">
				<span class="material-symbols-outlined px-4"> light_mode </span> Sáng
			</DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'dark'">
				<span class="material-symbols-outlined px-4"> dark_mode </span> Tối
			</DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'auto'">
				<span class="material-symbols-outlined px-2"> desktop_windows </span> Hệ thống
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
