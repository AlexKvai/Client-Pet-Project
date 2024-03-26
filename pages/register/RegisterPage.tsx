'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/ui/buttons/Button'

import { IRegisterForm } from '@/types/auth.types'

import { PAGES } from '@/config/pages-url.config'

import { useAuthContext } from '@/hooks/useAuth'

import { authService } from '@/services/auth.service'

const RegisterPage: FC = () => {
	const { register, handleSubmit, reset } = useForm<IRegisterForm>({
		mode: 'onChange'
	})
	const queryClient = useQueryClient()
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
					toast.error(
						`${Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message}`
					)
				})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getProfile']
			})
		}
	})

	const onSubmit: SubmitHandler<IRegisterForm> = data => {
		mutate(data)
	}

	return (
		<div className='flex min-h-[800px]'>
			<form
				className='flex flex-col w-1/4 m-auto shadow rounded-xl'
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
				<Button
					title='Зарегистрироваться'
					className='py-[5px] px-[10px] bg-black color-white border-solid border-2 border-sky-500 rounded-lg'
				/>
			</form>
		</div>
	)
}

export default RegisterPage
