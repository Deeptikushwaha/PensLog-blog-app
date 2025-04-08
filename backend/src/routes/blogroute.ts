import {Hono} from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'

export const blogRouter = new Hono<{

}>()


