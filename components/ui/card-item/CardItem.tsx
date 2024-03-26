import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { ICard } from '@/types/card.types'

const CardItem: FC<ICard> = ({ title, description, id, imageUrl }) => {
	return (
		<Link
			className='flex flex-row h-[255px] w-full items-start justify-start border-solid border-2 border-sky-500 mt-[10px]'
			href={`/article/${id}`}
		>
			<div>
				<Image
					src={
						imageUrl ||
						`https://4tololo.ru/sites/default/files/images/20181407165729.jpg`
					}
					width={250}
					height={250}
					alt='Picture of the author'
				/>
			</div>
			<div className='flex flex-col'>
				<p>{title}</p>
				<p>{description}</p>
			</div>
		</Link>
	)
}

export default CardItem
