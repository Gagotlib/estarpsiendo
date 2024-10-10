import { Request, Response } from "express"
import { cancelAppointmentService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService } from "../services/appointmentsServices"
import IAppointment from "../interfaces/IAppointment"
import { AppointmentDto } from "../dtos/appointmentDto"

export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments: IAppointment[] = await getAllAppointmentsService()
    res.status(200).json(appointments)
  } catch (error) {
    res.status(404).json({
      message: `Hubo un error del servidor al solicitar los turnos: ${error}`,
    })
  }
}
export const getAppointmentsByIdController = async (req: Request, res: Response): Promise<void> => {
  const appointmentId = parseInt(req.params.id)
  try {
    const foundedAppointment = await getAppointmentByIdService(appointmentId)
    res.status(200).json(foundedAppointment)
  } catch (error) {
    res.status(404).json({
      message: `${error}`,
    })
  }
}

export const addAppointmentController = async (req: Request, res: Response): Promise<void> => {
  const { date, time, userId, description } = req.body
  const AppointmentDto: AppointmentDto = { date, time, userId, description }
  try {
    const newAppointment = await createAppointmentService(AppointmentDto)
    res.status(201).json(newAppointment)
  } catch (error) {
    res.status(400).json({
      message: ` ${error}`,
    })
  }
}

export const cancelAppointmentController = async (req: Request, res: Response): Promise<void> => {
  const appointmentId = parseInt(req.params.id)
  try {
    const canceledAppointment = await cancelAppointmentService(appointmentId)
    res.status(200).json(canceledAppointment)
  } catch (error) {
    res.status(404).json({
      message: ` ${error}`,
    })
  }
}
