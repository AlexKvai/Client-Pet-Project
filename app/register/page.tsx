import { Metadata } from 'next'
import { FC } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import RegisterPage from '@/pages/register/RegisterPage'

export const metadata: Metadata = {
	title: 'Зарегистрироваться',
	...NO_INDEX_PAGE
}

const Page: FC = () => {
	return <RegisterPage />
}

export default Page
