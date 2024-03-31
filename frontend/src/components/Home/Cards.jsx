import { AiOutlineStar } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";

const Cards = () => {
    const cardData = [
        {
            title:"Todo1",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde repudiandae sunt tenetur",
            status:"InComplete"
        },
        {
            title:"Todo1",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde repudiandae sunt tenetur",
            status:"Completed"
        },
        {
            title:"Todo1",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde repudiandae sunt tenetur",
            status:"InComplete"
        },
        {
            title:"Todo1",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde repudiandae sunt teneturLorem ipsum dolor sit amet, consectetur adipisicing elit. Unde repudiandae sunt tenetur",
            status:"InComplete"
        }
    ]
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
        {cardData && cardData.map((data,i)=>(
            <div className=" bg-cyan-900 rounded-xl p-4 flex flex-col justify-between " key={i}>
                <div >
                    <h3 className="text-xl font-semibold">{data.title}</h3>
                    <p>{data.description}</p>
                </div>
                <div className="flex w-full items-center mt-8">  
                    <button className={` ${data.status === "InComplete" ? "hover:bg-cyan-950" : "bg-cyan-950"} p-2 rounded-xl border w-3/6 `}> {data.status} </button>
                    <div className="flex justify-around p-2 font-bold text-2xl w-3/6">
                        <button><AiOutlineStar /> </button>
                        <button><BiEdit /></button>
                        <button><AiOutlineDelete /></button>
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