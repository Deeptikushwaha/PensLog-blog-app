import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": number;
    "author": {
        "name": string;
    }
    "authorName": string;
}

//custom hook
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${SERVER_URL}/api/v1/post/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setBlogs([]);
                setLoading(false);
            });
    }, [])

    return {
        loading,
        blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${SERVER_URL}/api/v1/post/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blog
    }
}