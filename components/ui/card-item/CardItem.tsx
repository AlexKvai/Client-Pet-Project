import Image from 'next/image'
import { FC } from 'react'

import { ICard } from '@/types/card.types'

const CardItem: FC<ICard> = ({ title, description }) => {
	return (
		<div className='flex flex-col h-[300px] w-[350px] items-center justify-center border-solid border-2 border-sky-500 mx-[20px] my-[20px]'>
			<Image
				src='https://4tololo.ru/sites/default/files/images/20181407165729.jpg'
				width={250}
				height={250}
				alt='Picture of the author'
			/>
			<p>{title}</p>
			<p>{description}</p>
		</div>
	)
}

export default CardItem
