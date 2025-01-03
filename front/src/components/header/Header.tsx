'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import MenuIcon from '../icons/MenuIcon'
import { Inter } from '@next/font/google' // Importa la fuente

const geistSans = Inter({
	subsets: ['latin'],
	variable: '--font-geist-sans'
})


const links = [
	{ id: 2, text: 'Sobre mi', url: '/about' },
	{ id: 3, text: 'Mis servicios', url: '/services' },
	{ id: 4, text: 'Contacto', url: '/contact' }
]

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className={`h-20 md:h-40 w-full flex bg-[var(--secondary)] text-white text-center fixed z-50 `}>
			<nav className='flex justify-between items-center w-full px-4'>
				<Link href='/' className={`${geistSans.variable}`}>
					<Image src='/images/Estarpsiendo-2.png' alt='Estarpsiendo logo' width={200} height={200} onClick={() => setIsMenuOpen(false)} />
				</Link>

				<div className='hidden md:flex items-center gap-4'>
					<ul className='flex gap-4 p-4'>
						{links.map((link) => {
							const { id, text, url } = link
							return (
								<li key={id} className='text-xl hover:text-slate-500'>
									<Link href={url} onClick={() => setIsMenuOpen(false)} className={`${geistSans.variable}`}>
										{text}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>

				<button type='button' className='md:hidden' aria-label='Menu' onClick={() => setIsMenuOpen((prev) => !prev)}>
					<MenuIcon />
				</button>
				{/* Menu */}
				<div className={`absolute right-0 top-20 w-full bg-[var(--secondary)] text-white rounded shadow-lg z-50 transform transition-all duration-300 overflow-hidden ${isMenuOpen ? 'h-36' : 'h-0'}`}>
					<ul className='flex flex-col gap-4 p-4'>
						{links.map((link) => {
							const { id, text, url } = link
							return (
								<li key={id}>
									<Link href={url} onClick={() => setIsMenuOpen(false)} className={`${geistSans.variable}`}>
										{text}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
				{/* Overlay */}
			</nav>
			{isMenuOpen && <div className='fixed top-20 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm z-40' onClick={() => setIsMenuOpen(false)} />}
		</header>
	)
}
