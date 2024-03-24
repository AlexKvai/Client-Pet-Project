import { IArticleResponse, TypeArticleFormState } from '@/types/article.types'
import { IUser } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
	user: IUser
}

class ArticleService {
	private BASE_URL = '/article'

	async getAll() {
		const response = await axiosWithAuth.get<IArticleResponse[]>(this.BASE_URL)
		return response.data
	}

	async getOne(id: string) {
		const response = await axiosWithAuth.get<IArticleResponse>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}

	async createArticle(data: TypeArticleFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateArticle(id: string, data: TypeArticleFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteArticle(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const articleService = new ArticleService()
