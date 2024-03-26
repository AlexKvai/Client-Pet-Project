'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'

import { useAuthContext } from '@/hooks/useAuth'

import Button from '../ui/buttons/Button'
import Loader from '../ui/loader/Loader'

import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'

const Header: FC = () => {
	const { isAuth, setIsAuth } = useAuthContext()
	const router = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => {
			setIsAuth(false)
			return authService.logout()
		},
		onSuccess: () => router.push('/auth')
	})
	const { data, isLoading } = useQuery({
		queryKey: ['getProfile'],
		queryFn: () => userService.getProfile()
	})
	return (
		<>
			{isAuth && isLoading ? (
				<Loader />
			) : (
				<div className='flex flex-row justify-between border-solid border-2 border-sky-500 py-[20px] px-[20px]'>
					<div className='flex flex-row gap-x-8'>
						<Link href={'/'}>Сайт ТОС(Актуальная информация)</Link>
						<Link href={'/contacts'}>Связаться с председателем</Link>
					</div>
					<div className='flex flex-row gap-x-8'>
						{!isAuth ? (
							<>
								<Link href={'/auth'}>Войти</Link>
								<Link href={'/register'}>Зарегистрироваться</Link>
							</>
						) : (
							<>
								{data?.role === 'admin' && (
									<Link href={'/article'}>Создать статью</Link>
								)}

								<Button
									title='Выйти'
									onClick={() => {
										toast.success('Успешный выход')
										mutate()
									}}
								/>
							</>
						)}
					</div>
				</div>
			)}
		</>
	)
}
export default dynamic(() => Promise.resolve(Header), { ssr: false })
