import Link from 'next/link'
import React from 'react'

interface PostCardProps {
	post: {
		id: number
		title: string
		subtitle: string
		text: string
		img: string
	}
	expandedPostId?: number | null
	toggleExpand?: (postId: number) => void
}

const PostCard: React.FC<PostCardProps> = ({ post, expandedPostId,  }) => {
	return (
		<Link href={`/post/${post.id}`} key={post.id} className={`post ${expandedPostId === post.id ? 'post-expanded' : 'post-collapsed'}`} >
			<div className='flex flex-col gap-3 p-4 w-3/4'>
				<h3 className='post-title'>{post.title}</h3>
				<h4 className='post-subtitle'>{post.subtitle}</h4>
				<p className={`post-text ${expandedPostId === post.id ? 'post-expanded' : ''}`}>{post.text}</p>
			</div>
			<div
				className='image-background'
				style={{
					// backgroundImage: `url('${post.img}')` // Usamos el campo 'img' del post
					backgroundImage: `url('/images/estarpesiendo-intro.jpg')`
				}}
			/>
		</Link>
	)
}

export default PostCard
