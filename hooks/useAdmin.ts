import { useContext } from 'react'

import { AdminContext } from '@/store/context'

export function useAdminContext() {
	const context = useContext(AdminContext)

	return context
}
