import { Request, Response, NextFunction } from "express"

export const validateCreationUserData = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, birthdate, nDni, username, password } = req.body

  if (!name || !email || !birthdate || !nDni || !username || !password) {
    res.status(400).json({ error: "Error al crear nuevo usuario", message: "Faltan campos obligatorios en el cuerpo de la solicitud" })
    return
  }
  
  if (typeof nDni !== "number") {
    res.status(400).json({ error: "Error al crear nuevo usuario", message: "DNI debe ser un numero, sin . ni letras" })
    return
  }
  if (nDni < 1000000 || nDni > 99999999) {
    res.status(400).json({ error: "Error al crear nuevo usuario", message: "DNI debe ser un numero de 7 u 8 dígitos" })
    return
  }

  next()
}
