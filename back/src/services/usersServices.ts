import { AppDataSource } from "../config/data-source"
import { ICredentialDto } from "../dtos/credentialDto"
import { IuserDto } from "../dtos/userDto"
import { Appointment } from "../entities/AppointmentEntity"
import { User } from "../entities/UserEntity"
import { AppointmentRepository } from "../repositories/AppointmentRepository"
import { CredentialRepository } from "../repositories/CredentialRepository"
import { UserRepository } from "../repositories/UserRepository"
import { createCredentialsService } from "./credentialServices"

// Implementar una función que pueda retornar el arreglo completo de usuarios.
export const getAllUsersService = async (): Promise<User[]> => {
  const allUsers: User[] = await UserRepository.find({
    relations: { appointments: true },
  })
  return allUsers
}

// Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.
export const getUserByIdService = async (id: number): Promise<User> => {
  const foundUser: User | null = await UserRepository.findById(id)

  if (!foundUser) {
    throw new Error(`Usuario no encontrado`)
  }
  //al usuario encontrado por id, le agrego una propiedad con los appointments encontrados por el id
  const userAppointments: Appointment[] = await AppointmentRepository.find({ where: { userId: foundUser.id } })
  foundUser.appointments = userAppointments
  return foundUser
}

// Implementar una función que pueda crear un nuevo usuario dentro del arreglo PERO ten en cuenta que al momento de crear el usuario, debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales. Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.
export const createUserService = async (userDto: IuserDto): Promise<User> => {
  const { name, email, birthdate, nDni, username, password } = userDto

  const queryRunner = AppDataSource.createQueryRunner()
  await queryRunner.connect()
  try {
    await queryRunner.startTransaction()
    //compruebo si el usuario ya existe, ya que no quiero dos usuarios con el mismo username
    const usernameExist = await CredentialRepository.findOne({ where: { username } })
    if (usernameExist) {
      throw new Error("Ya existe un usuario con el mismo nombre de usuario")
    }
    const usernDniExist = await UserRepository.findOne({ where: { nDni } })
    if (usernDniExist) {
      throw new Error("Ya existe un usuario con el mismo nDni")
    }
    const userEmailExist = await UserRepository.findOne({ where: { email } })
    if (userEmailExist) {
      throw new Error("Ya existe un usuario con el mismo email")
    }
    //creo  las credenciales
    const credentialsDto: ICredentialDto = { username, password }
    const credentialsId = await createCredentialsService(credentialsDto)
    // Creo el registro de usuario
    const newUser: User = UserRepository.create({ name, email, birthdate, nDni, credentialsId })
    // guarda el registro
    await queryRunner.manager.save(newUser)
    await queryRunner.commitTransaction()
    return newUser
  } catch (error) {
    await queryRunner.rollbackTransaction()
    throw new Error(` ${error}`)
  } finally {
    await queryRunner.release()
  }
}
