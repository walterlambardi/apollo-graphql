import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import { Post } from '../entities/Post'
import { type Context } from '../types/Context'

export const PostType = objectType({
  name: 'Post',
  definition (t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.nonNull.string('description')
    t.nonNull.string('author')
    t.nonNull.string('image')
    t.nonNull.int('likes')
    t.nonNull.string('createdAt')
    t.nonNull.string('updateAt')
  }
})

export const PostsQuery = extendType({
  type: 'Query',
  definition (t) {
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      async resolve (_parent, _args, context: Context, _info): Promise<Post[]> {
        const { conn } = context
        return await conn.query('select * from post')
      }
    })
  }
})

export const CreatePostMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.nonNull.field('CreatePost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        author: nonNull(stringArg()),
        image: nonNull(stringArg())
      },
      async resolve (_parent, args, _context, _info) {
        const { title, description, author, image } = args
        return await Post.create({ title, description, author, image, likes: 0 }).save()
      }
    })
  }
})

export const LikePostMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.nonNull.field('likePost', {
      type: 'Post',
      args: {
        id: nonNull(intArg())
      },
      async resolve (_parent, args, _context: Context, _info) {
        const { id } = args
        const { conn } = _context

        console.log('ID EN SERVER:', id)

        const post = await conn.query('select * from post where id = $1', [id])

        console.log('post', JSON.stringify(post))

        if (post.length === 0) {
          throw new Error(`Post with ID ${id} not found`)
        }

        // Increment the likes and update the post
        post[0].likes += 1
        console.log('post.likes', post[0].likes)
        await conn.query('update post set likes = $1 where id = $2', [post[0].likes, id])

        return post[0]
      }
    })
  }
})
