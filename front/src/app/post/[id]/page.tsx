import React from 'react'
import Image from 'next/image'
import { API_URL } from '@/config/envs'
import axios from 'axios'

export interface DataType {
	id: number
	title: string
	text: string
	subtitle: string
	img: string
}

const PostPage = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const res = await axios.get(`${API_URL}/posts/${params.id}`)
    console.log(res.status)

    if (res.status !== 200) {
		return <div>Error: No se pudo cargar el post.</div>
	}

    const post: DataType = res.data
    console.log(post)

    return (
		<div className='page-container'>
			<h1 className='title'>{post.title}</h1>
			<h2 className='subtitle'>{post.subtitle}</h2>
			{/* <Image src={`${post.img}`} alt={post.title} width={500} height={500} /> */}
      <div className='px-4 my-4 bg-gray-100 '>

			<Image src='/images/estarpesiendo-intro.jpg' alt={post.title} width={500} height={500} className='rounded-lg' />
      </div>
			<p className='text'>{post.text}</p>
		</div>
	)
}

export default PostPage
