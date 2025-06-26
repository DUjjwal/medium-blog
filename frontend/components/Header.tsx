import { useNavigate } from "react-router"

function Header() {
    const path = location.pathname
    const showSearchBar = (path === "/blog" || path === "/create")
    const showCreate = (path === "/create")

    const navigate = useNavigate()

    return (
        <div className="w-full h-auto flex justify-between items-center">
            <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 cursor-submit" onClick={() => navigate("/")}><span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600 cursor-submit" onClick={() => navigate("/")}>Medium</span></h1>
            {!showSearchBar && <input type="text" placeholder="Search" className="outline rounded-lg w-[40%] p-2"/>}
            <div className="flex justify-center gap-x-2">
                {!showCreate && <button className="w-auto p-2 bg-blue-400 text-white rounded-lg font-medium hover:bg-blue-500 shadow" onClick={() => {
                    navigate("/create")
                }}>Create</button>}
                <button className="w-auto p-2 bg-black text-white rounded-lg font-medium shadow" onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/signup")
                }}>Logout</button>
            </div>
        </div>
    )
}

export default Header