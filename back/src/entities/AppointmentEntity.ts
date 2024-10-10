import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./UserEntity"

@Entity({
  name: "appointments",
})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: string
  @Column()
  time: string
  @Column({ default: "active" })
  status: "active" | "cancelled"
  @Column()
  description: string
  @Column()
  userId: number

  //relacion many to one con la tabla users
  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: "userId" })
  user: User
}
