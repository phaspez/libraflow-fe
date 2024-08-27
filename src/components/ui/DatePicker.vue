<script setup lang="ts">
import { ref, watch } from 'vue'
import {
	DateFormatter,
	type DateValue,
	getLocalTimeZone,
	today,
	type CalendarDate,
} from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils'
import MonthYearCalendar from '@/components/ui/MonthYearCalendar.vue'

const df = new DateFormatter('vi-VN', {
	dateStyle: 'long',
})
const value = ref<DateValue>()

// Declare emitted events
const emit = defineEmits<{
	(e: 'update:modelValue', value: Date | null): void
	(e: 'input', value: Date | null): void
	(e: 'blur'): void
	(e: 'change', value: Date | null): void
}>()

// Watch for changes in value and emit appropriate events
watch(value, (newValue) => {
	emit('update:modelValue', newValue ? newValue.toDate(getLocalTimeZone()) : null)
	emit('input', newValue ? newValue.toDate(getLocalTimeZone()) : null)
	emit('change', newValue ? newValue.toDate(getLocalTimeZone()) : null)
})

// Handle blur event
function handleBlur() {
	emit('blur')
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DatePicker',
	props: {
		name: {
			type: String,
			required: false,
		},
		value: {
			type: [String, Date, null],
			required: false,
		},
	},
	// Component logic...
})
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				:class="
					cn(
						'w-full justify-start text-left font-normal',
						!value && 'text-muted-foreground',
					)
				"
				@blur="handleBlur"
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Chọn ngày...' }}
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0">
			<MonthYearCalendar v-model="value" initial-focus />
		</PopoverContent>
	</Popover>
</template>
