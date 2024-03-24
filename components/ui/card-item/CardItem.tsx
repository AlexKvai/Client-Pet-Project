import Image from 'next/image'
import { FC } from 'react'

import { ICard } from '@/types/card.types'

const CardItem: FC<ICard> = ({ title, description }) => {
	return (
		<div className='flex flex-row h-[255px] w-full items-start justify-start border-solid border-2 border-sky-500 mt-[10px]'>
			<div>
				<Image
					src='https://4tololo.ru/sites/default/files/images/20181407165729.jpg'
					width={250}
					height={250}
					alt='Picture of the author'
				/>
			</div>
			<div className='flex flex-col'>
				<p>{title}</p>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default CardItem
