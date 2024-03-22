import { cardsData } from '@/datas/cardsData'
import { FC } from 'react'
import CardItem from '../card-item/CardItem'

const CardsList: FC = () => {
	return (
		<div className='flex flex-wrap  py-[20px] px-[20px] justify-center items-center'>
			{cardsData.map(cardItem => (
				<CardItem key={cardItem.title} {...cardItem} />
			))}
		</div>
	)
}

export default CardsList
