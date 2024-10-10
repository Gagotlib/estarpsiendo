import { AppDataSource } from "../config/data-source"
import { Appointment } from "../entities/AppointmentEntity"

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  findById: async function (id: number): Promise<Appointment> {
    const foundAppointment = await this.findOneBy({ id })
    if (foundAppointment) return foundAppointment
    else throw Error("No Appointment was found with the provided ID")
  },
})
