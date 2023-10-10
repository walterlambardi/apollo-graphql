import { extendType, floatArg, nonNull, objectType, stringArg } from 'nexus'
import { Product } from '../entities/Product'
import { type Context } from '../types/Context'
import { User } from '../entities/User'

export const ProductType = objectType({
  name: 'Product',
  definition (t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.float('price')
    t.nonNull.int('creatorId')
    t.field('createdBy', {
      type: 'User',
      async resolve (parent, _args, _context, _info): Promise<User | null> {
        return await User.findOne({ where: { id: parent.creatorId } })
      }
    })
  }
})

export const ProductsQuery = extendType({
  type: 'Query',
  definition (t) {
    t.nonNull.list.nonNull.field('products', {
      type: 'Product',
      async resolve (_parent, _args, context: Context, _info): Promise<Product[]> {
        const { conn } = context
        return await conn.query('select * from product')
      }
    })
  }
})

export const CreatreProductMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.nonNull.field('CreateProduct', {
      type: 'Product',
      args: {
        name: nonNull(stringArg()),
        price: nonNull(floatArg())
      },
      async resolve (_parent, args, context: Context, _info) {
        const { name, price } = args
        const { userId } = context

        if (userId == null) {
          throw new Error("Can't create product without logging in.")
        }

        return await Product.create({ name, price, creatorId: userId }).save()
      }
    })
  }
})
