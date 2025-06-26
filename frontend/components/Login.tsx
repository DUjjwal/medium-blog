import { ChangeEvent, useId, useState } from "react"
import { Link, useNavigate } from "react-router"
import axios from "axios"
import {toast, Bounce, ToastContainer} from "react-toastify"

function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const navigate = useNavigate()
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="shadow-lg rounded-lg w-[30%] h-[70%] flex flex-col justify-center p-6 gap-y-4">
                <Heading />
                <SubHeading />
                <InputBox label="Email" placeholder="me@example.com" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <InputBox label="Password" placeholder="" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button className="bg-black text-white font-medium rounded-lg p-2" onClick={async () => {
                    console.log(email, password)
                    const res = await axios.post("http://localhost:8000/api/v1/signin", {
                        "email": email,
                        "password": password
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    if(res.data.status === 200) {
                        localStorage.setItem("token", res.data.token)
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
                        setEmail("")
                        setPassword("")
                    }
                }}>Login</button>                
            </div>
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

function Heading() {
    return (
        <h2 className="text-4xl font-bold text-center">Log in to you account</h2>
    )
}

function SubHeading() {
    return (
        <p className="text-center my-1 text-lg text-gray-500">Dont have an account? <Link to="/signup" className="underline">Sign Up</Link></p>
    )
}

function InputBox(obj: {
    label:string,
    placeholder: string,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    value: string
}) {
    const id = useId()
    return (
        <div className="flex flex-col gap-y-1">
            <label className="text-lg text-black " htmlFor={id}>{obj.label}</label>
            <input className="outline rounded-lg p-2 outline-gray-300 text-black focus:outline-gray-500" type="text" placeholder={obj.placeholder} onChange={obj.onChange} id={id} value={obj.value}/>
        </div>
    )
}


export default Login