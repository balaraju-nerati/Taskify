import { MdOutlineLabelImportant } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";


const Sidebar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [data, setdata] = useState();
    const sidebarItems = [
        {
            title:"All Tasks",
            icons:<MdOutlineLabelImportant />,
            link:"/"
        },
        {
            title:"Important Tasks",
            icons:<MdOutlineLabelImportant />,
            link:"/importantTasks"
        },
        {
            title:"Completed Tasks",
            icons:<MdOutlineLabelImportant />,
            link:"/completedTasks"
        },
        {
            title:"Incompleted Tasks",
            icons:<MdOutlineLabelImportant />,
            link:"/incompleteTasks"
        }
    ]
    const logout = () => {
        localStorage.clear("id");
        localStorage.clear("token");
        dispatch(authActions.logout());
        history("/signup")
    }

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() =>{
        const fetch = async ()=>{
            const response = await axios.get("http://localhost:3000/api/v2/all-tasks", {headers})
            setdata(response.data.data);
        };
        if(localStorage.getItem("id") && localStorage.getItem("token")){
            fetch();
        }
    },[]);

  return (
    <>
        <div>
            <h2 className="text-2xl font-bold tracking-widest ">Taskify</h2>
            {data && <div>
                <h4 className="mt-6">{data.username}</h4>
                <h4 className="my-2">{data.email}</h4>
                </div>} <hr />
        </div>
        <div >
            {sidebarItems.map((items,i) => (
                <Link to={items.link} key={i} className="my-2 flex items-center gap-2 hover:bg-slate-600 rounded transition-all duration-300 p-2 cursor-pointer">
                    {items.icons} {items.title}
                </Link>
            ))}
        </div>
        <div>
            <button className="w-full p-2 rounded hover:bg-slate-600 border" onClick={logout}>Logout</button>
        </div>
    </>
  )
}

export default Sidebar