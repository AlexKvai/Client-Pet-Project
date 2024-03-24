import { useContext } from 'react'

import { AuthContext } from '@/store/context'

export function useAuthContext() {
	const context = useContext(AuthContext)

	return context
}
