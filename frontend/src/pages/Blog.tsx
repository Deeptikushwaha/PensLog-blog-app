import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import {Spinner} from "../components/Spinner" 
import { FullBlog } from "../components/FullBlog"

export const Blog = () => {

    const {id} = useParams();
    const {loading, blog} = useBlog({
      id : id || ""
    });

    if(loading || !blog){
      return <div>
        <Appbar/>
        <div className="h-screen flex justify-center flex-col">
         <div className="flex justify-center">
            <Spinner/>
         </div>
        </div> 
      </div>
    }
return <div>
  <FullBlog blog={blog}/>
 </div>

}