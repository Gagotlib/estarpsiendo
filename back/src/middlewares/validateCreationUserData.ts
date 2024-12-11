import { Request, Response, NextFunction } from "express"

export const validateCreationUserData = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, username, password, role} = req.body

  if (!name || !email  || !username || !password || !role) {
    res.status(400).json({ error: "Error al crear nuevo usuario", message: "Faltan campos obligatorios en el cuerpo de la solicitud" })
    return
  }


  next()
}
