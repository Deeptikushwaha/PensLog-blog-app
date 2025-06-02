import {Link } from "react-router-dom";

interface BlogCardProps{
    authorName: string;
    title: string;
    content: string;
    createdAt: string;
    id: number;
}

export const Blogcard = ({
    id,
    authorName,
    title,
    content,
    createdAt,
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {createdAt}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100)+"..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length/100)} minute(s) read`}
            </div>
        </div>
    </Link> 
}

export function Circle() {
    return <div className="w-2 h-2 bg-slate-500 rounded-full"> </div>
}

export function Avatar({name, size = "small"}: {name: string, size?: "small" | "big"}) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size==="small" ? "w-6 h-6" : "w-10 h-10"}`}> 
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
    </div>
}
