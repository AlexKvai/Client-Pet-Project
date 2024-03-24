import { Metadata } from 'next'
import { FC } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import AuthPage from '@/pages/auth/AuthPage'

export const metadata: Metadata = {
	title: 'Войти',
	...NO_INDEX_PAGE
}

const Page: FC = () => {
	return <AuthPage />
}

export default Page
