import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
	name: 'posts'
})
export class Post {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	text: string

	@Column({ nullable: true })
	img: string
}
