// 'use client'
// // import Image from 'next/image'
import { API_URL } from '@/config/envs'
import { DataType } from './interfaces/interfaces'
import PostCard from '@/components/PostCard'
import axios from 'axios'

export default async function Home() {

	const data = await axios.get(`${API_URL}/posts`)
	const posts = data.data

	return (
		<div className='page-container'>
			<h3 className='subtitle'>Mis ultimos posteos</h3>
			{data && (
				<div className='post-container'>
					{posts.map((post: DataType) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			)}
		</div>
	)
}
