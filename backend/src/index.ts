import { Hono } from 'hono'
import {cors} from 'hono/cors'
import { userRouter} from './routes/userroute';
import { postRouter } from './routes/blogroute';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()

app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", postRouter);

// app.post('/api/v1/user/signup', (c) => {
//   return c.text('Hello Hono!')
// })

// app.post('/api/v1/user/signin', (c) => {
//   return c.text('Hello Hono!')
// })

// app.post('/api/v1/user/blog', (c) => {
//   return c.text('Hello Hono!')
// })

// app.put('/api/v1/user/blog', (c) => {
//   return c.text('Hello Hono!')
// })

// app.get('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })


export default app
