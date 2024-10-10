import { Request, Response } from 'express'
import IPost from '../interfaces/IPost'
import { createPostService, getAllPostsService } from '../services/postsServices'
import { Post } from '../entities/PostEntity'

export const getAllPostsController = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts: Post[] = await getAllPostsService()
		res.status(200).json(posts)
	} catch (error) {
		res.status(500).json({
			message: `Hubo un error del servidor al traer los posts: ${error}`
		})
	}
}
export const getPostByIdController = async (req: Request, res: Response): Promise<void> => {}
export const createPostController = async (req: Request, res: Response): Promise<void> => {
	const { title, text } = req.body
	const postDto = { title, text }
	try {
		const newPost = await createPostService(postDto)
		res.status(201).json(newPost)
	} catch (error) {
		res.status(400).json({
			message: `Hubo un error al crear el usuario: ${(error as Error).message}`
		})
	}
}
export const updatePostController = async (req: Request, res: Response): Promise<void> => {}
export const deletePostController = async (req: Request, res: Response): Promise<void> => {}
