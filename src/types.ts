export type LoginFormData = {
	birthdate: Date
	firstName: string
	lastName: string
	token: string
}

export type Author = {
	_id: string
	name: string
	country?: string
	birthdate?: Date
	gender?: boolean
}

export type Category = {
	_id: string
	description?: string
	name: string
}

export type Publisher = {
	_id: string
	name: string
	address?: string
}

export type Book = {
	_id: string
	author?: Author
	description?: string
	title: string
	inLibrary: number
	image: string
	category?: Category
	pageCount: number
	publishYear: number
	publisher?: Publisher
}

export type User = {
	_id: string
	firstName: string
	lastName: string
	roles: string
	birthdate?: Date
	address?: string
	phone: string
}

export type CartItem = {
	bookId: string
	quantity: number
}
