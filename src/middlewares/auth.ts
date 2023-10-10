import * as jwt from 'jsonwebtoken'

export interface AuthTokenPayload {
  userId: number
}

export const auth = (header: string): AuthTokenPayload => {
  const token = header.split(' ')[1]

  if (token.length === 0) {
    throw new Error('Invalid token')
  }

  const res = jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret)
  console.log('res', res)

  return jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret) as AuthTokenPayload
}
