import { Appbar } from "../components/Appbar";
import {Blogcard} from "../components/blogcard";
import {useBlogs} from "../hooks";
import {BlogSkeleton} from "../components/BlogSkeleton";

export const Blogs = () => {
   const {loading, blogs} = useBlogs();

   if(loading){ 
      return <div>
         <Appbar/>
         <div className="flex justify-center">
            <div>
               <BlogSkeleton/>
            </div>
         </div>
      </div>
   } 
 return <div>
    <Appbar/>
      <div className="flex justify-center">
         <div>
         {blogs.map(blog => <Blogcard
         key={blog.id}
         id={blog.id}
         authorName={blog.authorName || "Anonymous"}
         title={blog.title}
         content={blog.content}
         createdAt={"2nd Apr 2025"}
         />)}
         </div>
      </div>
    </div>

}