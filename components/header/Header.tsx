import Link from 'next/link'
import { FC } from 'react'

const Header: FC = () => {
	return (
		<div className='flex flex-row justify-between border-solid border-2 border-sky-500 py-[20px] px-[20px]'>
			<div className='flex flex-row gap-x-8'>
				<Link href={'/'}>Сайт ТОС(Актуальная информация)</Link>
				<Link href={'/contacts'}>Связаться с председателем</Link>
			</div>
			<div className='flex flex-row gap-x-8'>
				<Link href={'/auth'}>Войти</Link>
				<Link href={'/register'}>Зарегистрироваться</Link>
			</div>
		</div>
	)
}

export default Header
