'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import Loader from '@/components/ui/loader/Loader'

import { useAdminContext } from '@/hooks/useAdmin'

import { articleService } from '@/services/article.service'

interface IArticlePageProps {
	params: { id: string }
}

const ArticlePage: FC<IArticlePageProps> = ({ params }) => {
	const { data, isFetching } = useQuery({
		queryKey: ['articleGetOne'],
		queryFn: () => articleService.getOne(params.id)
	})
	const { isAdmin } = useAdminContext()
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
				{isAdmin && (
					<Link href={`/article/update/${params.id}`}>Редактировать</Link>
				)}
			</div>
		</div>
	)
}

export default ArticlePage
