import { Metadata } from 'next'
import { FC } from 'react'

import ArticlePage from '@/pages/article/ArticlePage'

export async function generateMetadata({
	params: { id }
}: any): Promise<Metadata> {
	return { title: `Статья с id ${id}` }
}

const Page: FC = ({ params }: any) => {
	return <ArticlePage params={params} />
}

export default Page
