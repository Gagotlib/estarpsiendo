import { AppointmentDto } from "../dtos/appointmentDto"
import { Appointment } from "../entities/AppointmentEntity"
import { AppointmentRepository } from "../repositories/AppointmentRepository"
import { UserRepository } from "../repositories/UserRepository"

// Implementar una función que pueda retornar el arreglo completo de turnos.
export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const appointments: Appointment[] = await AppointmentRepository.find({
    relations: {
      user: true,
    },
  })
  return appointments
}
// Implementar una función que pueda obtener el detalle de un turno por ID.
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
  const foundAppointment: Appointment | null = await AppointmentRepository.findOneBy({ id })
  if (!foundAppointment) {
    throw new Error("Appointment no encontrado")
  }
  const foundUser = await UserRepository.findById(foundAppointment.userId)
  if (foundUser) {
    foundAppointment.user = foundUser
  }
  return foundAppointment
}
// Implementar una función que pueda crear un nuevo turno, siempre guardando, además, el ID del usuario que ha creado dicho turno. NO PUEDE HABER UN TURNO SIN ID DE USUARIO.
export const createAppointmentService = async (appointment: AppointmentDto) => {
  if (!appointment.userId) {
    throw new Error("Se requiere id del usuario que solicita el turno.")
  }

  const foundUser = await UserRepository.findById(appointment.userId)
  if (foundUser) {
    const newAppointment = AppointmentRepository.create({ ...appointment, status: "active" })
    newAppointment.user = foundUser
    AppointmentRepository.save(newAppointment)
    return newAppointment
  } else {
    throw new Error("El usuario no existe.")
  }
}
// Implementar una función que reciba el id de un turno específico y una vez identificado el turno correspondiente, cambiar su estado a “cancelled”.
export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
  try {
    const foundAppointment: Appointment | null = await AppointmentRepository.findById(id)
    if (!foundAppointment) {
      throw new Error(`Appointment no encontrado para id: ${id}`)
    }
    foundAppointment.status = "cancelled"
    const updatedAppointment = await AppointmentRepository.save(foundAppointment)
    return updatedAppointment
  } catch (error) {
    throw `${error}`
  }
}
