import { Request, Response, NextFunction } from "express"

export const validateLoginUserData = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body
  if (!email || !password) {
		res.status(400).json({ error: 'Error en el login', message: 'Faltan campos obligatorios en el cuerpo de la solicitud' })
		return
	}
  next()
}
