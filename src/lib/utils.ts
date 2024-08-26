import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function setCookie(name: string, value: string, days: number = 14) {
	const date = new Date()
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
	const expires = `expires=${date.toUTCString()}`
	document.cookie = `${name}=${value};${expires};path=/`
}

export function deleteCookie(name: string) {
	// set the exp dat way back so it became expired
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
