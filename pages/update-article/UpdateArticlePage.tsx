'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/ui/buttons/Button'
import Loader from '@/components/ui/loader/Loader'

import { IArticleForm } from '@/types/article.types'

import { articleService } from '@/services/article.service'

interface IUpdateArticlePageProps {
	params: { id: string }
}

const UpdateArticlePage: FC<IUpdateArticlePageProps> = ({ params }) => {
	const { register, handleSubmit, reset } = useForm<IArticleForm>({
		mode: 'onChange'
	})
	const { push } = useRouter()
	const { data, isFetching } = useQuery({
		queryKey: ['articleGetOne'],
		queryFn: () => articleService.getOne(params.id)
	})
	const { mutate } = useMutation({
		mutationKey: ['updateArticle'],
		mutationFn: (data: IArticleForm) => {
			return articleService
				.updateArticle(params.id, data)
				.then(response => {
					toast.success('Успешно обновлена статья')
					reset()
					push(`/article/${params.id}`)
				})
				.catch(error => {
					toast.error(
						`${Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message}`
					)
				})
		}
	})
	const { title, description, imageUrl } = { ...data }
	const [values, setValues] = useState({
		title,
		description,
		imageUrl
	})
	useEffect(() => {
		setValues({
			title,
			description,
			imageUrl
		})
	}, [isFetching])

	const onSubmit: SubmitHandler<IArticleForm> = data => {
		mutate(data)
	}
	return isFetching ? (
		<Loader />
	) : (
		<div className='flex min-h-[800px]'>
			<form
				className='m-auto shadow rounded-xl flex flex-col'
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					type='text'
					value={values.imageUrl}
					placeholder='imageUrl.png'
					className='mb-[10px] text-black'
					{...register('imageUrl')}
					onChange={e =>
						setValues(prev => ({ ...prev, imageUrl: e.target.value }))
					}
				/>
				<input
					type='text'
					value={values.title}
					placeholder='Название статьи'
					className='mb-[10px] text-black'
					{...register('title', { required: true })}
					onChange={e =>
						setValues(prev => ({ ...prev, title: e.target.value }))
					}
				/>
				<textarea
					placeholder='Описание статьи'
					value={values.description}
					className='mb-[10px] text-black'
					{...register('description', { required: true })}
					onChange={e =>
						setValues(prev => ({ ...prev, description: e.target.value }))
					}
				/>
				<Button
					title='Обновить статью'
					className='py-[5px] px-[10px] bg-black color-white border-solid border-2 border-sky-500 rounded-lg'
				/>
			</form>
		</div>
	)
}

export default UpdateArticlePage
