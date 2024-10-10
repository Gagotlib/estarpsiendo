import { Request, Response } from "express"
import { createUserService, getAllUsersService, getUserByIdService } from "../services/usersServices"
import { validateCredentials } from "../services/credentialServices"
import { ICredentialDto } from "../dtos/credentialDto"
import { IuserDto } from "../dtos/userDto"
import { UserRepository } from "../repositories/UserRepository"
import { User } from "../entities/UserEntity"

export const getUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await getAllUsersService()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message: `Hubo un error del servidor al traer los usuarios: ${error}`,
    })
  }
}

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const userId: number = parseInt(req.params.id)
  try {
    const foundUser: User | null = await getUserByIdService(userId)
    //creo una variable provisional para no dar las credencialesId en la respuesta
    const user = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      birthdate: foundUser.birthdate,
      nDni: foundUser.nDni,
      appointments: foundUser.appointments,
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({
      message: `${error}`,
    })
  }
}

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const { name, email, birthdate, nDni, username, password } = req.body
  const userDto: IuserDto = { name, email, birthdate, nDni, username, password }
  try {
    const newUser: User = await createUserService(userDto)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({
      message: `Hubo un error al crear el usuario: ${(error as Error).message}`,
    })
  }
}

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body
  const credentialsDto: ICredentialDto = { username, password }
  try {
    // me fijo que las credenciales sean validas
    const credentialsId = await validateCredentials(credentialsDto)
    if (credentialsId) {
      // uso un metodo personalizado del repositorio para buscar al usuario por credenciales
      const foundUser = await UserRepository.findByCredentialsId(credentialsId)
      // mando respuesta personalizada
      res.status(200).json({
        login: true,
        user: {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          birthdate: foundUser.birthdate,
          nDni: foundUser.nDni,
        },
      })
    }
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
    })
  }
}
