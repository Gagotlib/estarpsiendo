import { DataType } from '@/app/interfaces/interfaces'
import { API_URL } from '@/config/envs'
import { fetchData } from '@/services/fetchData'
import React from 'react'
import PostCard from './post/PostCard'
import { Ubuntu } from '@next/font/google'

const ubuntu = Ubuntu({
	weight: ['400', '500', '700'],
	subsets: ['latin']
})


export default async function LastPosts() {
	let posts: DataType[] = []

	try {
		posts = await fetchData<DataType[]>(`${API_URL}/posts`)
	} catch (error) {
		console.error(error)
	}
	return (
		<>
			<h3 className={`subtitle  ${ubuntu.className} `}>Mis ultimos posteos</h3>
			{posts.length > 0 ? (
				<div className='post-container'>
					{posts.map((post: DataType) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			) : (
				<p>No hay posts disponibles</p>
			)}
		</>
	)
}
