import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./UserEntity"

@Entity({
  name: "credentials",
})
export class Credential {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  //relacion one to one con la tabla user
  //si algo no funciona comentar todo
  @OneToOne(() => User)
  // @JoinColumn()
  user: User
}
