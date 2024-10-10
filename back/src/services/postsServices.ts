import { AppDataSource } from '../config/data-source'
import { postDto } from '../dtos/postDto'
import { Post } from '../entities/PostEntity'
import { PostRepository } from '../repositories/PostRepository'

export const getAllPostsService = async (): Promise<Post[]> => {
	const allPosts: Post[] = await PostRepository.find({
		// relations: { appointments: true }
	})
	return allPosts
}

export const createPostService = async ({ title, text }: postDto): Promise<Post> => {
	const newPost = PostRepository.create({ title, text })
	return await PostRepository.save(newPost)
}
