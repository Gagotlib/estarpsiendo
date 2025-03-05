import { AppDataSource } from '../config/data-source'
import { Post } from '../entities/PostEntity'

export const PostRepository = AppDataSource.getRepository(Post).extend({
	findById: async function (id: number): Promise<Post> {
		const foundPost = await this.findOneBy({ id })
		if (foundPost) return foundPost
		else throw Error('No se encontró post con el id proporcionado')
	}
})