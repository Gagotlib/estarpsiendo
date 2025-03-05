import { AppDataSource } from "../config/data-source"
import { Credential } from "../entities/CredentialEntity"

export const CredentialRepository = AppDataSource.getRepository(Credential)
