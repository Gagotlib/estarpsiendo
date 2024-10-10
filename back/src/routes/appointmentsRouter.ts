import { Router } from "express"
import { addAppointmentController, cancelAppointmentController, getAppointmentsByIdController, getAppointmentsController } from "../controllers/appointmentsController"
import { validateParams } from "../middlewares/validateParam"

const appointmentRouter: Router = Router()

appointmentRouter.get("/", getAppointmentsController)
appointmentRouter.get("/:id", getAppointmentsByIdController)
appointmentRouter.post("/schedule", addAppointmentController)
appointmentRouter.put("/cancel/:id", validateParams, cancelAppointmentController)

export default appointmentRouter
