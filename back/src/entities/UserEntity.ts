import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./CredentialEntity"
import { Appointment } from "./AppointmentEntity"

@Entity({
  name: "users", // nombre de la tabla en el DB
})
export class User {
  //!agregar un listener que transforme email a todo minusculas
  @BeforeInsert()
  transformEmail() {
    this.email = this.email?.toLowerCase()
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  birthdate: string

  @Column({ unique: true })
  nDni: number

  @Column()
  credentialsId: number

  //relacion one to one con tabla credentials
  @OneToOne(() => Credential)
  @JoinColumn({ name: "credentialsId" })
  credential: Credential
  //relacion one to many con tabla appointments
  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[]
}
