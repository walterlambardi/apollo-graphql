import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()

export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    title!: string

  @Column()
    description!: string

  @Column()
    author!: string

  @Column()
    image!: string

  @Column()
    likes!: number

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updateAt: Date
}
