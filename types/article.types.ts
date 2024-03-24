export interface IArticleResponse {
	id: string
	createdAt?: string
	updatedAt?: string
	imageUrl: string
	title: string
	description: string
}

export type TypeArticleFormState = Partial<
	Omit<IArticleResponse, 'id' | 'updatedAt'>
>
