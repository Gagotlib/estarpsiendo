import { NextFunction, Request, Response } from "express"

export const validateParams = (req: Request, res: Response, next: NextFunction): void => {
  const id = parseInt(req.params.id)

  if (!id) {
    res.status(400).json({ error: "Error al cancelar el Turno", message: "Faltan campos obligatorios de la solicitud" })
    return
  }
  if (typeof id !== "number") {
    res.status(400).json({ error: "Error al cancelar el Turno", message: "id debe ser un numero" })
    return
  }
  next()
}
