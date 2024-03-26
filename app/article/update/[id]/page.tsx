import { Metadata } from 'next'
import { FC } from 'react'

import UpdateArticlePage from '@/pages/update-article/UpdateArticlePage'

export async function generateMetadata({
	params: { id }
}: any): Promise<Metadata> {
	return { title: `Обновление статьи с id ${id}` }
}

const Page: FC = ({ params }: any) => {
	return <UpdateArticlePage params={params} />
}

export default Page
