import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useSelector } from "react-redux";

const Signup = () => {

    const history = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if(isLoggedIn === true){
        history("/");
    }
    const [data, setdata] = useState({
        username: "",
        email: "",
        password: "",
    });


  const change = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const submit = async() =>{
    try {
        if(data.username === "" || data.email === "" || data.password === ""){
            alert("All fields are required to signup")
        }else{
            const response = await axios.post("http://localhost:3000/api/v1/signup", data);
            setdata({
                username: "",
                email: "",
                password: "",
              })
            history("/signin")
        }
    } catch (error) {
        alert(error.response.data.message);
    }
  }
  return (
    <>
      <div className="h-[98vh] flex items-center justify-center">
        <div className="w-2/6 p-4 rounded bg-gray-900 flex flex-col gap-4">
          <div className="text-2xl font-semibold">Signup</div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value = {data.username}
            className="w-full px-3 py-2 rounded bg-gray-700  font-semibold"
            required
            autoComplete="off"
            onChange={change}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value = {data.email}
            className="w-full px-3 py-2 rounded bg-gray-700  font-semibold"
            required
            autoComplete="off"
            onChange={change}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value = {data.password}
            className="w-full px-3 py-2 rounded bg-gray-700  font-semibold"
            required 
            autoComplete="off"
            onChange={change}
          />
          <div className="flex items-center justify-between">
            <button className="py-2 px-4 rounded border border-gray-600 hover:bg-slate-600" onClick={submit}>
              SignUp
            </button>
            <div className="flex gap-2 text-gray-500">
              <h2>Already have an Account?</h2>
              <Link to={"/signin"} className=" hover:text-white ">
                Click here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
