'use client'

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react'

import { EnumTokens } from '@/services/auth-token.service'
import { userService } from '@/services/user.service'

export const AuthContext = createContext<any>(null)
export const AdminContext = createContext<any>(null)

export default function ContextProvider({ children }: any) {
	const { data, isFetching, isLoading } = useQuery({
		queryKey: ['getProfile'],
		queryFn: () => userService.getProfile()
	})
	const [isAuth, setIsAuth] = useState(!!Cookies.get(EnumTokens.ACCESS_TOKEN))
	const [isAdmin, setIsAdmin] = useState(data?.role === 'admin')
	useEffect(() => {
		setIsAdmin(data?.role === 'admin')
	}, [isFetching, isLoading])

	return (
		<AdminContext.Provider
			value={{ isAdmin, setIsAdmin, isLoading, isFetching }}
		>
			<AuthContext.Provider value={{ isAuth, setIsAuth }}>
				{children}
			</AuthContext.Provider>
		</AdminContext.Provider>
	)
}
