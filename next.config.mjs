/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'http', hostname: 'localhost', pathname: '**' },
			{
				protocol: 'https',
				hostname: '4tololo.ru',
				pathname: '**'
			}
		]
	}
}

export default nextConfig
