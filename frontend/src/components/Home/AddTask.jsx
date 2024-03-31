

const AddTask = ({addTaskForm, setaddTaskForm}) => {
  return (
    <>
        <div className={` ${addTaskForm} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
        <div className={` ${addTaskForm} fixed top-0 left-0 h-screen w-full flex items-center justify-center`}>
            <div className="w-2/6 bg-gray-900 p-4 rounded flex flex-col gap-2">
                <input type="text" placeholder="Name of the Task" name="title" className="px-3 py-2 rounded bg-gray-700  font-semibold"/>
                <textarea name="description" placeholder="Write about your task" cols="20" rows="10" className="px-3 py-2 rounded bg-gray-700  font-semibold"></textarea>
                <div className="flex justify-center gap-4">
                    <button className="py-2 px-4 rounded border border-gray-600 hover:bg-slate-600">Add Task</button>
                    <button className="py-2 px-4 rounded border border-gray-600 hover:bg-slate-600" onClick={()=>{
                        setaddTaskForm("hidden")
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddTask