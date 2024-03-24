'use client'

import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { EnumTokens } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const Header: FC = () => {
	const router = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return (
		<>
			<div className='flex flex-row justify-between border-solid border-2 border-sky-500 py-[20px] px-[20px]'>
				<div className='flex flex-row gap-x-8'>
					<Link href={'/'}>Сайт ТОС(Актуальная информация)</Link>
					<Link href={'/contacts'}>Связаться с председателем</Link>
				</div>
				<div className='flex flex-row gap-x-8'>
					{!Cookies.get(EnumTokens.ACCESS_TOKEN) ? (
						<>
							<Link href={'/auth'}>Войти</Link>
							<Link href={'/register'}>Зарегистрироваться</Link>
						</>
					) : (
						<div>
							<button onClick={() => mutate()}>Выйти</button>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
export default Header
