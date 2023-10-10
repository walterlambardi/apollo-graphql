import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import typeormConfig from './typeorm.config'
import { type Context } from './types/Context'
import { auth } from './middlewares/auth'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const boot = async () => {
  const conn = await typeormConfig.initialize()

  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => {
      const token = ((req?.headers?.authorization) != null) ? auth(req.headers.authorization) : null
      return { conn, userId: token?.userId }
    }
  })

  await server.listen(3000).then(({ url }) => { console.log('Listening on ', url) })
}

boot().catch((err) => {
  console.log('Error:', err)
})
