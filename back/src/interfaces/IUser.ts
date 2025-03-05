interface IUser {
  id: number
  name: string
  email: string
  birthdate: string
  nDni: number
  credentialsId: number // referencia al id de credentials
}

export = IUser
