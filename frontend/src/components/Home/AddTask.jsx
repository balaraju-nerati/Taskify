import { useEffect, useState } from "react";
import axios from "axios";

const AddTask = ({
  addTaskForm,
  setaddTaskForm,
  updatedData,
  setUpdatedData,
}) => {
  const [Data, setData] = useState({ title: "", description: "" });

  useEffect(() => {
    setData({
      title: updatedData.title,
      description: updatedData.description,
    });
  }, [updatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.description === "") {
      alert("All Fields are required");
    } else {
      await axios.post("http://localhost:3000/api/v2/create-task", Data, {
        headers,
      });
      setData({ title: "", description: "" });
      setaddTaskForm("hidden");
    }
  };

  const updateTask = async () => {
    if (Data.title === "" || Data.description === "") {
      alert("All Fields are required");
    } else {
      await axios.put(`http://localhost:3000/api/v2/update-task/${updatedData.id}`, Data, {
        headers,
      });
      setUpdatedData({
        id: "",
        title: "",
        description: "",
      });
      setData({ title: "", description: "" });
      setaddTaskForm("hidden");
    }
  };

  return (
    <>
      <div
        className={` ${addTaskForm} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={` ${addTaskForm} fixed top-0 left-0 h-screen w-full flex items-center justify-center`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded flex flex-col gap-2">
          <input
            type="text"
            placeholder="Name of the Task"
            name="title"
            className="px-3 py-2 rounded bg-gray-700  font-semibold"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="description"
            placeholder="Write about your task"
            cols="20"
            rows="10"
            className="px-3 py-2 rounded bg-gray-700  font-semibold"
            value={Data.description}
            onChange={change}
          ></textarea>
          <div className="flex justify-center gap-4">
            {updatedData.id !== "" ? (
              <button
                className="py-2 px-4 rounded border border-gray-600 hover:bg-slate-600"
                onClick={updateTask}
              >
                Update
              </button>
            ) : (
              <button
                className="py-2 px-4 rounded border border-gray-600 hover:bg-slate-600"
                onClick={submitData}
              >
                Add Task
              </button>
            )}
            <button
              className="py-2 px-4 rounded border border-gray-600 hover:bg-slate-600"
              onClick={() => {
                setaddTaskForm("hidden");
                setData({
                  title: "",
                  description: "",
                });
                setUpdatedData({
                  id: "",
                  title: "",
                  description: "",
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
