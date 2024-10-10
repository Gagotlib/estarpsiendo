import { Request, Response, NextFunction } from "express"

export const validateLoginUserData = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).json({ error: "Error en el login", message: "Faltan campos obligatorios en el cuerpo de la solicitud" })
    return
  }
  next()
}
