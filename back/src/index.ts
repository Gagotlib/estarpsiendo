import server from './server'
import { PORT } from './config/envs'
import 'reflect-metadata'
import { AppDataSource } from './config/data-source'
// import './seed' // Importamos el archivo de seed

AppDataSource.initialize()
	.then(() => {
		console.log('Conexión a la base de datos con éxito')

		// Iniciar el servidor
		server.listen(PORT, () => {
			console.log(`Servidor escuchando en el puerto ${PORT}`)
		})
	})
	.catch((error) => {
		console.error('Error al conectar con la base de datos: ', error)
	})
