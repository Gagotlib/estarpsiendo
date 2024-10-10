interface IAppointment {
  id: number
  date: string //fecha
  time: string //hora , tal vez puede ser number
  userId: number // referencia al usuario que lo creó
  status: "active" | "cancelled" // active o canceled
  description?: string
}

export = IAppointment
