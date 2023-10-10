import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { Product } from './entities/Product'
import { User } from './entities/User'
import { Post } from './entities/Post'

dotenv.config()

export default new DataSource({
  type: 'postgres',
  url: process.env.CONNECTION_STRING,
  entities: [Product, User, Post]
  // synchronize: true
})
