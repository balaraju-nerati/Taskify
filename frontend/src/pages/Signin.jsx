import { Link } from "react-router-dom"

const Signin = () => {
  return (
    <>
        <div className="h-[98vh] flex items-center justify-center">
            <div className="w-2/6 p-4 rounded bg-gray-900 flex flex-col gap-4">
                <div className="text-2xl font-semibold">Signin</div>
                <input type="text" placeholder="Username" name="username" className="w-full px-3 py-2 rounded bg-gray-700  font-semibold" required/>
                <input type="text" placeholder="Password" name="password" className="w-full px-3 py-2 rounded bg-gray-700  font-semibold" required/>
                <div className="flex items-center justify-between">
                    <button className="py-2 px-4 rounded border border-gray-600 hover:bg-slate-600">Signin</button>
                    <div className="flex gap-2 text-gray-500">
                        <h2 >Don't have an Account?</h2>
                        <Link to={"/signup"} className=" hover:text-white ">
                            Click here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signin