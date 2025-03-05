import { Request, Response } from 'express'
import IPost from '../interfaces/IPost'
import { createPostService, deletePostService, getAllPostsService, getPostByIdService, updatePostService } from '../services/postsServices'
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
export const getPostByIdController = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params
	try {
		const post: IPost | null |undefined  = await getPostByIdService(Number(id))
		if (!post) {
			res.status(404).json({
				message: `Post con id ${id} no encontrado.`
			})
			return
		}
		res.status(200).json(post)
	} catch (error) {
		res.status(500).json({
			message: `Hubo un error del servidor al traer el post: ${error}`
		})
	}
}
export const createPostController = async (req: Request, res: Response): Promise<void> => {
	const { title, text, img, subtitle } = req.body
	const postDto = { title, text, img, subtitle }
	try {
		const newPost = await createPostService(postDto)
		res.status(201).json(newPost)
	} catch (error) {
		res.status(400).json({
			message: `Hubo un error al crear el usuario: ${(error as Error).message}`
		})
	}
}
export const updatePostController = async (req: Request, res: Response): Promise<void> => {
	  const { id } = req.params // Obtenemos el id desde los parámetros
		const { title, text, img, subtitle } = req.body // Obtenemos las propiedades desde el body

		try {
			// Llamamos al servicio para actualizar el post
			const updatedPost = await updatePostService(Number(id), { title, text, img, subtitle })

			if (!updatedPost) {
				res.status(404).json({
					message: `Post con id ${id} no encontrado.`
				})
				return
			}

			// Si se actualiza correctamente, devolvemos el post actualizado
			res.status(200).json(updatedPost)
		} catch (error) {
			res.status(500).json({
				message: `Hubo un error al actualizar el post: ${(error as Error).message}`
			})
		}
}
export const deletePostController = async (req: Request, res: Response): Promise<void> => {
	 const { id } = req.params // Obtenemos el id desde los parámetros

		try {
			// Llamamos al servicio para eliminar el post
			const deletedPost = await deletePostService(Number(id))

			if (!deletedPost) {
				res.status(404).json({
					message: `Post con id ${id} no encontrado.`
				})
				return
			}

			// Si se elimina correctamente, devolvemos un mensaje de éxito
			res.status(200).json({
				message: `Post con id ${id} eliminado con éxito.`
			})
		} catch (error) {
			res.status(500).json({
				message: `Hubo un error al eliminar el post: ${(error as Error).message}`
			})
		}
}
