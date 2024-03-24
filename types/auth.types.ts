export interface IAuthForm {
	email: string
	password: string
}

export interface IRegisterForm {
	email: string
	name: string
	password: string
}

export interface IUser {
	email: string
	name: string
	password: string
	role?: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
