'use client'

import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import CardItem from '../card-item/CardItem'
import Loader from '../loader/Loader'

import { articleService } from '@/services/article.service'

const CardsList: FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['articleGetAll'],
		queryFn: () => articleService.getAll()
	})
	return isLoading ? (
		<Loader />
	) : (
		<div className='flex flex-wrap justify-center items-center'>
			{data?.map(cardItem => (
				<CardItem
					key={cardItem.title}
					{...cardItem}
				/>
			))}
		</div>
	)
}

export default CardsList
