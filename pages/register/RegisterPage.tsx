'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { IRegisterForm } from '@/types/auth.types'

import { PAGES } from '@/config/pages-url.config'

import { useAuthContext } from '@/hooks/useAuth'

import { authService } from '@/services/auth.service'

const RegisterPage: FC = () => {
	const { register, handleSubmit, reset } = useForm<IRegisterForm>({
		mode: 'onChange'
	})

	const { push } = useRouter()
	const { setIsAuth } = useAuthContext()
	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IRegisterForm) => {
			return authService
				.register(data)
				.then(response => {
					setIsAuth(response)
					toast.success('Успешная регистрация')
					reset()
					push(PAGES.HOME)
				})
				.catch(error => {
					toast.error('Неверные данные для регистрации')
				})
		}
	})

	const onSubmit: SubmitHandler<IRegisterForm> = data => {
		mutate(data)
	}

	return (
		<div className='flex min-h-screen'>
			<form
				className='w-1/4 m-auto shadow rounded-xl'
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					type='email'
					placeholder='email@email.ru'
					className='mb-[10px] text-black'
					{...register('email', { required: true })}
				/>
				<input
					type='text'
					placeholder='Василий Иванович'
					className='mb-[10px]  text-black'
					{...register('name', { required: true })}
				/>
				<input
					type='password'
					placeholder='******'
					className='mb-[10px]  text-black'
					{...register('password', { required: true })}
				/>
				<button type='submit'>Зарегистрироваться</button>
			</form>
		</div>
	)
}

export default RegisterPage
