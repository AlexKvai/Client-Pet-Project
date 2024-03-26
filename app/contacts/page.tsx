import { Metadata } from 'next'
import { FC } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ContactPage from '@/pages/contacts/ContactPage'

export const metadata: Metadata = {
	title: 'Связаться с председателем',
	...NO_INDEX_PAGE
}

const Page: FC = () => {
	return <ContactPage />
}

export default Page
