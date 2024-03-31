import { Outlet } from "react-router-dom"
import Sidebar from "../components/Home/Sidebar"
import AddTask from "../components/Home/AddTask"
import { useState } from "react"


const Home = () => {
  const [addTaskForm, setaddTaskForm] = useState("hidden")
  return (
    <>
      <div className="flex h-[98vh] gap-4">
          <div className="w-1/6 border rounded-xl border-gray-600 p-4 flex flex-col justify-between">
              <Sidebar/>
          </div>
          <div className="w-5/6 border rounded-xl border-gray-600 p-4">
            <div className="flex justify-end ">
              <button className="mx-4 py-2 px-6 rounded border border-gray-600 hover:bg-slate-600" onClick={()=>{
                setaddTaskForm("fixed")
              }}>
                Add Task
              </button>
            </div>
              <Outlet/>
            
          </div>
      </div>
      <AddTask addTaskForm = {addTaskForm} setaddTaskForm={setaddTaskForm}/>
    </>
  )
}

export default Home