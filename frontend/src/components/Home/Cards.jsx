import { AiOutlineStar } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Cards = ({data, setaddTaskForm, setUpdatedData}) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      };
    const handleCompleteTask = async(id)=>{
        try {
            const response = await axios.put(`http://localhost:3000/api/v2/update-complete-task/${id}`,
            {},
            {headers})
            
            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }
    const handleImportantTask = async(id)=>{
        try {
            const response = await axios.put(`http://localhost:3000/api/v2/update-imp-task/${id}`,
            {},
            {headers})
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdate = (id, title, description)=>{
        setaddTaskForm("fixed")
        setUpdatedData({
            id:id,
            title:title,
            description:description
        })
    }

    const deleteTask = async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3000/api/v2/delete-task/${id}`,
            {headers})
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
        {data && data.map((task,i)=>(
            <div className=" bg-cyan-900 rounded-xl p-4 flex flex-col justify-between " key={i}>
                <div >
                    <h3 className="text-xl font-semibold">{task.title}</h3>
                    <p>{task.description}</p>
                </div>
                <div className="flex w-full items-center mt-8">  
                    <button className={` ${task.complete === false ? "hover:bg-cyan-950" : "bg-cyan-950"} p-2 rounded-xl border w-3/6 `} onClick={()=>handleCompleteTask(task._id)}> {task.complete === true? "Completed":"Incomplete"} </button>
                    <div className="flex justify-around p-2 font-bold text-2xl w-3/6">
                        <button onClick={()=>{
                            handleImportantTask(task._id)
                        }}>{task.important === false?<AiOutlineStar />:<FaStar />} </button>
                        <button onClick={()=>{
                            handleUpdate(task._id, task.title, task.description)
                        }}><BiEdit /></button>
                        <button><AiOutlineDelete onClick={()=>{
                            deleteTask(task._id)
                        }}/></button>
                    </div>
                </div>
            </div>
        ))}


        
        {/* <div className=" bg-cyan-900 rounded-xl p-4 flex flex-col justify-center items-center gap-2 hover:scale-105 hover:cursor-pointer transition-all duration-300 ">
            <IoAddCircleOutline className="text-5xl" />
            <h2 className="text-xl">Add New Task</h2>
        </div> */}

    </div>
  )
}

export default Cards