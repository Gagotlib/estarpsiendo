export interface postDto {
	title: string
	text: string
	img?: string 
	subtitle: string
}

export interface UpdatePostDto {
	title?: string 
	text?: string
	img?: string
	subtitle?: string
}