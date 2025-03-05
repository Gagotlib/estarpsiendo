import { AppDataSource } from "../config/data-source"
import { User } from "../entities/UserEntity"

export const UserRepository = AppDataSource.getRepository(User).extend({
  findById: async function (id: number): Promise<User> {
    const foundUser = await this.findOneBy({ id })
    if (foundUser) return foundUser
    else throw Error("No se encontró usuario con el id proporcionado")
  },

  findByCredentialsId: async function (credentialsId: number): Promise<User> {
    const foundUserById = await this.findOne({ where: { credentialsId } })
    if (foundUserById) return foundUserById
    else throw Error("No se encontró credencial con el id proporcionado")
  },
})
