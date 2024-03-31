import { MdOutlineLabelImportant } from "react-icons/md";
import { Link } from "react-router-dom";

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
const Sidebar = () => {
  return (
    <>
        <div>
            <h2 className="text-xl font-semibold">Application name</h2>
            <h4 className="my-4">User name</h4>
        </div>
        <div >
            {sidebarItems.map((items,i) => (
                <Link to={items.link} key={i} className="my-2 flex items-center gap-2 hover:bg-slate-600 rounded transition-all duration-300 p-2 cursor-pointer">
                    {items.icons} {items.title}
                </Link>
            ))}
        </div>
        <div>
            <button className="w-full p-2 rounded bg-slate-600">Logout</button>
        </div>
    </>
  )
}

export default Sidebar