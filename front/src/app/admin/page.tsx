'use client'
import { useFetchData } from '@/hooks/useFetchData'
import React, { useState } from 'react'
import { DataType } from '../interfaces/interfaces'
import { API_URL } from '@/config/envs'
import Spiner from '@/components/Spiner'

const Dashboard: React.FC = () => {
	const { data, loading, error } = useFetchData<DataType[]>(`${API_URL}/posts`)
	const [expandedPostId, setExpandedPostId] = useState<number | null>(null)
	const toggleExpand = (postId: number) => {
		setExpandedPostId((prevId) => (prevId === postId ? null : postId))
	}

	// const handleViewDetails = (id: number) => {
	// 	// Handle view details logic
	// 	console.log(`View details for post ${id}`)
	// }

	// const handleDelete = (id: number) => {
	// 	// Handle delete logic
	//   console.log(`Delete post ${id}`)
	// }

	if (loading)
		return (
			<div className='page-container'>
				<Spiner />
			</div>
		)
	if (error) return <div>Error: {error.message}</div>

	return (
		<div className='page-container'>
			<h1 className='title'>Dashboard</h1>
			{data && (
				<div className='post-container'>
					{data.map((post) => (
						<div key={post.id} className={`post ${expandedPostId === post.id ? 'post-expanded' : 'post-collapsed'}`} onClick={() => toggleExpand(post.id)}>
							<div className='flex flex-col gap-3 p-4 w-3/4'>
								<h3 className='post-title'>{post.title}</h3>
								<h4 className='post-subtitle'>{post.subtitle}</h4>
								<p className={`post-text ${expandedPostId === post.id ? 'post-expanded' : ''}`}>{post.text}</p>
							</div>
							<div
								className='image-background'
								style={{
									// backgroundImage: `url(${post.img})` // Usamos el campo 'img' del post
									backgroundImage: `url('/images/estarpesiendo-intro.jpg')` // Usamos el campo 'img' del post
								}}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Dashboard
