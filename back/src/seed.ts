import { AppDataSource } from './config/data-source'
import { Post } from './entities/PostEntity'

const seedPosts = async () => {
	try {
		const connection = await AppDataSource.getRepository(Post)

		// Verificamos si ya existen los posteos en la base de datos
		const existingPosts = await connection.find()

		if (existingPosts.length === 0) {
			const posts = [
				{
					title: 'Post 1',
					subtitle: 'Subtitle 1',
					text: 'This is the first post content.',
					img: 'https://example.com/image1.jpg'
				},
				{
					title: 'Post 2',
					subtitle: 'Subtitle 2',
					text: 'This is the second post content.',
					img: 'https://example.com/image2.jpg'
				},
				{
					title: 'Post 3',
					subtitle: 'Subtitle 3',
					text: 'This is the third post content.',
					img: 'https://example.com/image3.jpg'
				},
				{
					title: 'Post 4',
					subtitle: 'Subtitle 4',
					text: 'This is the fourth post content.',
					img: 'https://example.com/image4.jpg'
				},
				{
					title: 'Post 5',
					subtitle: 'Subtitle 5',
					text: 'This is the fifth post content.',
					img: 'https://example.com/image5.jpg'
				}
			]

			// Insertamos los posteos si no existen
			await connection.save(posts)
			console.log('Seed data added successfully!')
		} else {
			console.log('Posts already exist, skipping seed.')
		}
	} catch (error) {
		console.error('Error during seed process: ', error)
	}
}

seedPosts()
