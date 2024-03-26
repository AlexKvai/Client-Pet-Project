'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'

import Button from '@/components/ui/buttons/Button'
import Loader from '@/components/ui/loader/Loader'

import { PAGES } from '@/config/pages-url.config'

import { useAdminContext } from '@/hooks/useAdmin'
import { useAuthContext } from '@/hooks/useAuth'

import { articleService } from '@/services/article.service'

interface IArticlePageProps {
	params: { id: string }
}

const ArticlePage: FC<IArticlePageProps> = ({ params }) => {
	const { push } = useRouter()
	const { data, isFetching } = useQuery({
		queryKey: ['articleGetOne'],
		queryFn: () => articleService.getOne(params.id)
	})
	const { mutate } = useMutation({
		mutationKey: ['deleteArticle'],
		mutationFn: () => {
			return articleService
				.deleteArticle(params.id)
				.then(response => {
					toast.success('Успешно удалена статья')
					push(PAGES.HOME)
				})
				.catch(error => {
					toast.error(
						`${Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message}`
					)
				})
		}
	})
	const { isAdmin } = useAdminContext()
	const { isAuth } = useAuthContext()
	return isFetching ? (
		<Loader />
	) : (
		<div className='flex flex-row'>
			<Image
				src={
					data?.imageUrl ||
					`https://4tololo.ru/sites/default/files/images/20181407165729.jpg`
				}
				width={250}
				height={250}
				alt={data?.title || ''}
			/>
			<div className='flex flex-col'>
				<p>{data?.title}</p>
				<p>{data?.description}</p>
				{isAuth && isAdmin && (
					<Link href={`/article/update/${params.id}`}>Редактировать</Link>
				)}
				{isAuth && isAdmin && (
					<Button
						className='py-[5px] px-[10px] bg-red color-white border-solid border-2 border-sky-500 rounded-lg'
						title='Удалить статью'
						onClick={() => {
							confirm('Вы действительно хотите удалить статью?')
								? mutate()
								: toast.error('Вы отменили операцию удаления')
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default ArticlePage
