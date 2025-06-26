import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import {toast, Bounce, ToastContainer} from "react-toastify"
import axios from "axios"

function getTags(tags: string) {
    const arr: string[] = tags.split(",")
    
    arr.map(str => str.trim())
    
    while(arr.length < 5)
        arr.push("")

    return arr.slice(0,5)
}



function Create() {
    const [title, setTitle] = useState("")
    const ref = useRef<HTMLTextAreaElement | null>(null)

    const [description, setDescription] = useState("")
    const ref2 = useRef<HTMLTextAreaElement | null>(null)


    const [tags, setTags] = useState("")
    const ref3 = useRef<HTMLTextAreaElement | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        if(ref.current) {
            ref.current.style.height = 'atuo'
            ref.current.style.height = ref.current.scrollHeight + 'px'
        }

    }, [title])

    useEffect(() => {
        if(ref2.current) {
            ref2.current.style.height = 'atuo'
            ref2.current.style.height = ref2.current.scrollHeight + 'px'
        }

    }, [description])


    useEffect(() => {
        if(ref3.current) {
            ref3.current.style.height = 'atuo'
            ref3.current.style.height = ref3.current.scrollHeight + 'px'
        }

    }, [tags])

    return (
        <div className="px-10 py-5 flex flex-col">
            <textarea className="h-auto text-5xl focus:outline-none text-black font-medium h-auto overflow" placeholder="Title" ref={ref} onChange={(e) => setTitle(e.target.value)}/>
            <textarea className="text-3xl focus:outline-none text-gray-900 font-medium h-auto mt-4"  placeholder="Description" ref={ref2} onChange={(e) => setDescription(e.target.value)} />
            <textarea className="text-3xl focus:outline-none text-gray-700 font-medium h-auto mt-4"  placeholder="Add tags , separated" ref={ref3} onChange={(e) => setTags(e.target.value)} />
             <button className="p-2 bg-blue-400 text-white rounded-lg font-medium hover:bg-blue-500 shadow text-2xl w-[50%] self-center" onClick={async () => {
                const options = { year: 'numeric', month: 'short', day: 'numeric' }
                const date = new Date().toLocaleDateString('en-US',options)

                const TAGS = getTags(tags)


                const res = await axios.post("http://localhost:8000/api/v1/blog", {
                    title,
                    content: description,
                    date
                }, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })
                const postid = res.data.id
                if(res.data.status === 200) {
                    await axios.post("http://localhost:8000/api/v1/tags", {
                        tag1: TAGS[0],
                        tag2: TAGS[1],
                        tag3: TAGS[2],
                        tag4: TAGS[3],
                        tag5: TAGS[4],
                        postId: postid
                    }, {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    })
                    navigate("/")
                }
                else {
                    toast.error(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                    setTitle("")
                    setDescription("")
                }
             }}>Publish</button>
             <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            />
        </div>
    )
}

export default Create