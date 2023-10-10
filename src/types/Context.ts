import { type DataSource } from 'typeorm'

export interface Context {
  conn: DataSource
  userId: number | undefined
}
