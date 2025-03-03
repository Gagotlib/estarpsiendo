import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/header/Header'
import { Inter } from '@next/font/google'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
})

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter'
})


export const metadata: Metadata = {
	title: 'Estarpsiendo',
	description: 'web application dedicated to mental health'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='es'>
			<body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}  antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	)
}
