import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Blogcard"
export const FullBlog = ({blog}:{blog: Blog}) =>{
    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 19 April 2024
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.authorName || "Anonymous"}/>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.authorName || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}
