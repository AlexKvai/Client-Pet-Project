import { Metadata } from 'next'
import { FC } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import CreateArticlePage from '@/pages/create-article/CreateArticlePage'

export const metadata: Metadata = {
	title: 'Создание статьи',
	...NO_INDEX_PAGE
}

const Page: FC = () => {
	return <CreateArticlePage />
}

export default Page
