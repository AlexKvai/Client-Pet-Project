'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/ui/buttons/Button'

import { IAuthForm } from '@/types/auth.types'

import { PAGES } from '@/config/pages-url.config'

import { useAuthContext } from '@/hooks/useAuth'

import { authService } from '@/services/auth.service'

const AuthPage: FC = () => {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { push } = useRouter()
	const { setIsAuth } = useAuthContext()
	const { mutate } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthForm) => {
			return authService
				.login(data)
				.then(response => {
					setIsAuth(response)
					toast.success('Успешная авторизация')
					reset()
					push(PAGES.HOME)
				})
				.catch(error => {
					toast.error('Неверный логин или пароль')
				})
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className='flex min-h-[800px]'>
			<form
				className='m-auto shadow rounded-xl flex flex-col'
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					type='email'
					placeholder='email@email.ru'
					className='mb-[10px] text-black'
					{...register('email', { required: true })}
				/>
				<input
					type='password'
					placeholder='******'
					className='mb-[10px] text-black'
					{...register('password', { required: true })}
				/>
				<Button
					title='Войти'
					className='py-[5px] px-[10px] bg-black color-white border-solid border-2 border-sky-500 rounded-lg'
				/>
			</form>
		</div>
	)
}

export default AuthPage
