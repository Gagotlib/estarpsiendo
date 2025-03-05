'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {


  return (
    <footer className='h-20 md:h-24 w-full bg-[var(--secondary)] text-white flex flex-col md:flex-row items-center justify-center gap-4 p-4'>
      <Link href='/'>
        <Image
          src='/images/Estarpsiendo-2.png'
          alt='Estarpsiendo logo'
          width={100}
          height={100}
          priority
        />
      </Link>
      <p className='text-center'>
        © Con mucho ❤️ de EstarPSiendo
      </p>
    </footer>
  )
}
