'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

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
			setIsAuth(data)
			return authService.login(data)
		},
		onSuccess() {
			toast.success('Успешная авторизация')
			reset()
			push(PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className='flex min-h-screen'>
			<form
				className='w-1/4 m-auto shadow rounded-xl'
				onSubmit={handleSubmit(onSubmit)}
			>
				<input {...register('email', { required: true })} />
				<input {...register('password', { required: true })} />
				<button type='submit'>Войти</button>
			</form>
		</div>
	)
}

export default AuthPage
