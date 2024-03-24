'use client'

import Cookies from 'js-cookie'
import { createContext, useState } from 'react'

import { EnumTokens } from '@/services/auth-token.service'

export const AuthContext = createContext<any>(null)

export default function AuthContextProvider({ children }: any) {
	const [isAuth, setIsAuth] = useState(!!Cookies.get(EnumTokens.ACCESS_TOKEN))

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			{children}
		</AuthContext.Provider>
	)
}
