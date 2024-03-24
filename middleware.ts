import { NextRequest, NextResponse } from 'next/server'

import { PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = url.includes('/auth')
	const isRegisterPage = url.includes('/register')

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(PAGES.HOME, url))
	}

	if (isRegisterPage && refreshToken) {
		return NextResponse.redirect(new URL(PAGES.HOME, url))
	}

	if (isRegisterPage) {
		return NextResponse.next()
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/i/:path*', '/auth/:path', '/register/:path']
}
