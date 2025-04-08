import {Hono} from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'
import {sign } from 'hono/jwt';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

//to get the right types on c.env, when initializing Hono app, pass the types of env as a generic
//ideally one should hash the passwords before storing them in the db

//Sign-up - inserting data to db and error handling

userRouter.post('/signup',async(c)=>{
const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json().catch(()=>({}));
//   const {success} = signupInput.safeParse(body);
//   if(!success){
//     c.status(411);
//     return c.json({message: 'Invalid input'})
//   }

try {
    const finduser = await prisma.user.findFirst({
        where:{
            email:body.email
        },
    });
    if(finduser){
        c.status(411);
        return c.json({
            message:'User already exists'
        })
    }

    const user = await prisma.user.create({
        data:{
            email:body.email,
            name: body.name,
            password: body.password,
        }
    })

    const token = await sign({id:user.id}, c.env.JWT_SECRET)
    return c.json({jwt: token})
} catch(error){
    console.error('Signup error:', error); 
    c.status(500);
    return c.json({message: 'Error signing up'});
}
})

//Sign-in
// userRouter.post('/signin',async(c)=>{
    
// })

//Get user

//check user