import { FC } from 'react'

import CardItem from '../card-item/CardItem'

import { cardsData } from '@/datas/cardsData'

const CardsList: FC = () => {
	return (
		<div className='flex flex-wrap justify-center items-center'>
			{cardsData.map(cardItem => (
				<CardItem
					key={cardItem.title}
					{...cardItem}
				/>
			))}
		</div>
	)
}

export default CardsList
