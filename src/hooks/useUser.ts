import { ref, onMounted } from 'vue'
import type { LoginFormData } from '@/types.js'
import axios from 'axios'

export function useUser() {
	const user = ref<LoginFormData | undefined>()

	onMounted(() => {
		axios
			.get(import.meta.env.VITE_BACKEND_URL + '/api/user/me', {
				withCredentials: true,
			})
			.then((res) => {
				user.value = res.data as LoginFormData
			})
	})

	return { user }
}
