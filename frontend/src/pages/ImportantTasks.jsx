import { useEffect, useState } from "react";
import Cards from "../components/Home/Cards"
import axios from "axios"

const ImportantTasks = () => {
  const [data, setdata] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(() => {
    axios.get("http://localhost:3000/api/v2/get-imp-tasks", { headers })
    .then(response => {
      setdata(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  },[]);
  return (
    <div>{ <Cards data={data}/> }</div>
  )
}

export default ImportantTasks