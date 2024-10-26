<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { ref, watch } from 'vue'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()
const open = ref(false)

const keyword = ref('')
const keys = useMagicKeys()
const CmdJ = keys['Cmd+J']

function handleOpenChange() {
	open.value = !open.value
}

watch(CmdJ, (v) => {
	if (v) handleOpenChange()
})

function handleSearch() {
	handleOpenChange()
	router.push({ name: 'books', query: { search: keyword.value } })
}
</script>

<template>
	<Button @click="handleOpenChange" variant="outline" class="aspect-square">
		<span class="material-symbols-outlined"> search </span>
	</Button>
	<p class="text-sm text-muted-foreground hidden">
		Press
		<kbd
			class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
		>
			<span class="text-xs">⌘</span>J
		</kbd>
	</p>
	<CommandDialog :open="open" @update:open="handleOpenChange" @keyup.enter="handleSearch">
		<CommandInput
			@input="(ev) => (keyword = ev.target.value)"
			@keyup.enter="handleSearch"
			placeholder="Tìm kiếm bằng từ khóa..."
		/>
	</CommandDialog>
</template>
