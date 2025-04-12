import {Hono} from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'
import {decode, sign, verify} from 'hono/jwt';
import {hashpass, comparepass} from '../hashing/hashpswd'

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : { 
        jwtPayload : string
    }
}>();

//get the header and verify the token
postRouter.use('/*', async(c,next)=>{
    try {
        const authHeader = c.req.header('Authorization') || '';
        console.log('Authorization token:', authHeader);
        const response = await verify(authHeader, c.env.JWT_SECRET);
        console.log('jwt verification response:', response);

        if(response?.id){
            c.set('jwtPayload', response.id);  //storing only id
            console.log('jwtPayload set:', response.id);
            await next();
            return;
        } else{
            throw new Error('invalid token');
        }
    } catch(error) {
        console.error('jwt verification error:', error);
        c.status(401);
        return c.json({ message: 'Unauthorized' });
    }
});

//get all blogs
postRouter.get('/bulk', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,

    }).$extends(withAccelerate());

    try{
        const blogs = await prisma.post.findMany({
            orderBy:{
                createdAt : 'desc'
            }
        });
        c.status(200)
        return c.json({blogs});
    } catch(error) {
        c.status(403)
        return c.json({message:'Error fetching blogs'});
    }
});

//create a blog
postRouter.post('/blog', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('jwtPayload');
    console.log(userId);

    if (!userId) {
    c.status(401); // Not Found
    return c.json({ message: "User ID not provided" });
    }

    try{
        const body = await c.req.json();
        console.log('Request body:', body);  
        const author = await prisma.user.findFirst({
            where: {
                id: userId,
            },
        })
        
        const blog = await prisma.post.create({
                data: {
                    title: body.title,
                    content: body.content,
                    authorId: userId,
                    //imagelink: body.imagelink,
                    authorName: author?.name || author?.email || 'Anonymous'
                }
            });
            c.status(200);
            return c.json({id: blog.id});
        } catch(error){
            console.error(error);
            c.status(500);
            return c.json({ message: 'Error Initiating Blog Post'});
        }
    // } catch(error){
    //     console.error('Blog post error:', error);
    //     c.status(403);
        
    // }
});

//update a blog
postRouter.put('/update',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const body = await c.req.json()
        console.log('Request body:', body);
        // Validate required fields
        if (!body.id) {
            c.status(400);
            return c.json({ message: "Blog ID is required" });
        }
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data:{
                title: body.title,
                content: body.content,
                imagelink: body.imagelink,
            }
        })
        c.status(200)
        return c.json({id: blog.id});
    } catch(error){
        console.error('Blog update error:', error);
        return c.status(403);
    }
});

//get by id
postRouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findUnique({
            where: {
                id: c.req.param('id'),
            }
        })
        c.status(200)
        return c.json({blog});
    } catch(error){
        c.status(403)
        return c.json({message: 'Error fetching blog'});
    }
});

//delete a blog
postRouter.delete('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        await prisma.post.delete({
            where: {
                id: c.req.param('id'),
            }
        })
        c.status(200)
        return c.json({message: 'Blog deleted successfully'});
    } catch(error){
        c.status(403)
        return c.json({message: 'Error deleting blog'});
    }
})

