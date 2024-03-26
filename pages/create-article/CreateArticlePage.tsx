'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/ui/buttons/Button'

import { IArticleForm } from '@/types/article.types'

import { PAGES } from '@/config/pages-url.config'

import { articleService } from '@/services/article.service'

const CreateArticlePage: FC = () => {
	const { register, handleSubmit, reset } = useForm<IArticleForm>({
		mode: 'onChange'
	})
	const queryClient = useQueryClient()
	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['createArticle'],
		mutationFn: (data: IArticleForm) => {
			return articleService
				.createArticle(data)
				.then(response => {
					toast.success('Успешно создана статья')
					reset()
					push(PAGES.HOME)
				})
				.catch(error => {
					toast.error(
						`${Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message}`
					)
				})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getProfile']
			})
		}
	})

	const onSubmit: SubmitHandler<IArticleForm> = data => {
		mutate(data)
	}
	return (
		<div className='flex min-h-[800px]'>
			<form
				className='m-auto shadow rounded-xl flex flex-col'
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					type='text'
					placeholder='imageUrl.png'
					className='mb-[10px] text-black'
					{...register('imageUrl')}
				/>
				<input
					type='text'
					placeholder='Название статьи'
					className='mb-[10px] text-black'
					{...register('title', { required: true })}
				/>
				<textarea
					placeholder='Описание статьи'
					className='mb-[10px] text-black'
					{...register('description', { required: true })}
				/>
				<Button
					title='Создать статью'
					className='py-[5px] px-[10px] bg-black color-white border-solid border-2 border-sky-500 rounded-lg'
				/>
			</form>
		</div>
	)
}

export default CreateArticlePage
