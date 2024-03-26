import { IBase } from './root.types'

export interface IArticleResponse extends IBase {
	imageUrl: string
	title: string
	description: string
}

export interface IArticleForm {
	imageUrl?: string
	title: string
	description: string
}

export type TypeArticleFormState = Partial<
	Omit<IArticleResponse, 'id' | 'updatedAt'>
>
