import { FC } from 'react'

import ArticlePage from '@/pages/article/ArticlePage'

const Page: FC = ({ params }: any) => {
	console.log(params)
	return <ArticlePage params={params} />
}

export default Page
