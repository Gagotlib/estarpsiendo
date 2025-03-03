import Image from 'next/image'
import React from 'react'
import { Ubuntu } from '@next/font/google'

const ubuntu = Ubuntu({
	weight: ['400', '500', '700'],
	subsets: ['latin']
})

export default function Intro() {
	return (
		<div className='w-full  md:max-h-1/4  flex flex-col md:flex-row items-center  justify-center md:justify-start py-4'>
			<div className='w-full md:w-1/2  md:max-h-[500px]  flex items-center justify-center relative  md:rounded-[100px] overflow-hidden'>
				{/* Imagen de fondo */}
				<Image src='/images/bg-img-into.jpg' alt='Estarpsiendo logo' width={1200} height={1000} className='w-full h-full object-cover absolute top-0 left-0 opacity-70  blur-[2px]  brightness-50 ' />

				{/* Imagen en el frente */}
				<Image src='/images/Estarpsiendo-1.png' alt='Estarpsiendo logo' width={1000} height={1000} className='w-full h-1/2 -translate-y-20 md:-translate-y-32 z-10' />
			</div>
			<div className=' flex-col items-center justify-center bg-[#ece9e9] md:w-1/2  -translate-y-20  px-4'>
				<p className={` ${ubuntu.className} font-medium text-2xl text-center md:w-3/4  justify-self-center mt-8`}>
					En Estar P-siendo, ofrecemos una combinación única de terapias holísticas y herramientas de crecimiento personal diseñadas para equilibrar tu cuerpo, mente y emociones. A través de nuestros
					programas personalizados, ayudamos a reducir el estrés, mejorar el bienestar emocional y encontrar el equilibrio que tanto necesitas.
				</p>
			</div>
		</div>
	)
}
