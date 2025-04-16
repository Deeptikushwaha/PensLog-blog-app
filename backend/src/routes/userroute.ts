import {Hono} from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'
import {sign, verify } from 'hono/jwt';
import {hashpass, comparepass} from '../hashing/hashpswd'
import {signUpInput, signInInput} from '@deeptikushwaha/penslog-common'

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
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({message: 'Invalid input'})
  }

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

    const userPassword = await hashpass(body.password)

    const user = await prisma.user.create({
        data:{
            email:body.email,
            name: body.name,
            password: userPassword,
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
userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()
    const {success} = signInInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message: 'Invalid input'})
    }

    try{
        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })
        if(!user){
            c.status(411)
            return c.json({message: 'User does not exist'})
        }

        const checkUser = await comparepass(body.password, user.password);
        if(!checkUser){
            c.status(403)
            return c.json({message: 'Invalid password'})
        }

        const {password,...rest} = user;
        const token = await sign({ id:user.id }, c.env.JWT_SECRET)
        return c.json({ jwt:token, user: rest })
    } catch(error){
        return c.status(403);
    }
});

//Get user
userRouter.get('/getuser/:id',async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const authorid = c.req.param("id");
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: authorid,
            },
        });
        if(!user){
            c.status(411);
            return c.json({ message: "User does not exist" });
        }
        c.status(200);
        return c.json({ name: user.name });
    } catch(error){
        c.status(500);
        return c.json("Internal server error");
    }
});

//check user
userRouter.get('/check',async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const token = c.req.header('Authorization') || '';
        const res = await verify(token, c.env.JWT_SECRET)
        if(res){
            c.status(200)
            return c.json({res})
        }
    } catch(error){
        console.error('Check user error:', error);
        c.status(403)
        return c.json({ message: 'UnAuthorized'})
    }
});