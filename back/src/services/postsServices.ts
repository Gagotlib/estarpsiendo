import { AppDataSource } from '../config/data-source'
import { postDto, UpdatePostDto } from '../dtos/postDto'
import { Post } from '../entities/PostEntity'
import { PostRepository } from '../repositories/PostRepository'

export const getAllPostsService = async (): Promise<Post[]> => {
	const allPosts: Post[] = await PostRepository.find({
		// relations: { appointments: true }
	})
	return allPosts
}

export const createPostService = async ({ title, text, img, subtitle }: postDto): Promise<Post> => {
	const newPost = PostRepository.create({ title, text, img, subtitle })
	return await PostRepository.save(newPost)
}

export const getPostByIdService = async (id: number): Promise<Post | undefined | null> => {
	const post: Post | undefined | null = await PostRepository.findOne({ where: { id } })
	if (!post) {
		return null // Si el post no se encuentra, retornamos null
	}
	return post
}

export const updatePostService = async (id: number, updateData: UpdatePostDto): Promise<Post | null> => {
	const post: Post | null | undefined = await getPostByIdService(id)
	if (!post) {
		return null
	}
	if (updateData.title) post.title = updateData.title
	if (updateData.text) post.text = updateData.text
	if (updateData.img) post.img = updateData.img
	if (updateData.subtitle) post.subtitle = updateData.subtitle
	await PostRepository.save(post)
	return post
}

export const deletePostService = async (id: number): Promise<Post | null> => {

	// Buscamos el post por id
	const post = await PostRepository.findOne({ where: { id } })

	if (!post) {
		return null // Si el post no se encuentra, retornamos null
	}

	// Eliminamos el post
	await PostRepository.remove(post)

	return post // Devolvemos el post eliminado
}
