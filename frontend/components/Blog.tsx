import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import axios from "axios"

interface Post {
    title:string,
    content:string,
    author: {
        name: string
    },
    date: string,
    id:string,
    tags: {
        tag1: string,
        tag2: string,
        tag3: string,
        tag4: string,
        tag5: string
    }[]
}

function Blog() {

    const [id] = useSearchParams()
    const postId = id.get("id")
    console.log(postId)
    const [post, setPost] = useState<Post | null>(null)
    const [tags, setTags] = useState<string[]>(["","","","",""])
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`http://localhost:8000/api/v1/blog/${postId}`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            setPost(res.data.post)
            console.log(res.data.post)
            const obj = res.data.post.tags
            console.log(obj)
            if(obj.length>=1) {
                setTags([obj[0].tag1,obj[0].tag2,obj[0].tag3,obj[0].tag4,obj[0].tag5])
            }
        }
        getData()
    }, [])


    if(!post) {
        return <div role="status" className="text-center flex justify-center items-center">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
        </div>
    }
    
    return (
        <div className="w-full flex flex-col gap-y-2 shadow-sm rounded p-4 mt-4">
            <div className="flex items-center gap-x-2">
                <div className="h-8 w-8 rounded-full bg-purple-300 flex justify-center items-center text-white text-sm">{post?.author.name[0]}</div>
                <p className="text-gray-800 font-medium">{post?.author.name}</p>
                <p className="text-gray-500 font-medium">{post?.date}</p>
            </div>
            <div className="w-[70%]">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">{post?.title}</h5>
                <p className="font-normal text-gray-700 text-1xl">{post?.content}</p>
            </div>
            <div className="mt-4 flex overflow-hidden gap-x-2 text-lg">
                {tags.filter(ele => ele!="").map(function (ele) {

                    return (
                        <button className=" text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-600">{ele}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default Blog