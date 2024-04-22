import Cards from "../components/Home/Cards"
import axios from "axios"
import { useEffect, useState } from "react";
import AddTask from "../components/Home/AddTask"



const AllTasks = () => {
  const [addTaskForm, setaddTaskForm] = useState("hidden")
  const [data, setdata] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    id:"",
    title:"",
    description:""
  })

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(() => {
    axios.get("http://localhost:3000/api/v2/all-tasks", { headers })
    .then(response => {
      setdata(response.data.data.tasks);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  },[]);
  return (
    <>
      <div>
        <div className="flex justify-end ">
          <button className="mx-4 py-2 px-6 rounded border border-gray-600 hover:bg-slate-600" onClick={()=>{
            setaddTaskForm("fixed")
          }}>
            Add Task
          </button>
        </div>
        <div>{data && (<Cards data={data} setaddTaskForm={setaddTaskForm} setUpdatedData={setUpdatedData}/>)}</div>
      </div>
      <AddTask addTaskForm = {addTaskForm} setaddTaskForm={setaddTaskForm} updatedData={updatedData} setUpdatedData={setUpdatedData}/>
    </>
  )
}

export default AllTasks