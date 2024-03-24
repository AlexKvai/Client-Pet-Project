import { FC } from 'react'

interface IButton {
	title: string
	onClick?: () => void
	type?: 'submit' | 'reset' | 'button' | undefined
	className?: string
}

const Button: FC<IButton> = ({
	title,
	onClick,
	type = 'submit',
	className
}) => {
	return (
		<button
			className={className}
			type={type}
			onClick={onClick}
		>
			{title}
		</button>
	)
}

export default Button
