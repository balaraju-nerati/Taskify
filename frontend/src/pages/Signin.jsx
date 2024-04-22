import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth"


const Signin = () => {
    const [data, setdata] = useState({
        username: "",
        password: "",
      });
    
      const history = useNavigate();
      const dispatch = useDispatch();
      const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if(isLoggedIn === true){
        history("/");
    }
    
      const change = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value });
      };
    
      const submit = async() =>{
        try {
            if(data.username === "" || data.password === ""){
                alert("All fields are required to signup")
            }else{
                const response = await axios.post("http://localhost:3000/api/v1/signin", data);
                setdata({
                    username: "",
                    password: "",
                  })
                localStorage.setItem("id",response.data.id);
                localStorage.setItem("token",response.data.token);
                dispatch(authActions.login);
                history("/")
            }
        } catch (error) {
            alert(error.response.data.message)
        }
      }
  return (
    <>
      <div className="h-[98vh] flex items-center justify-center">
        <div className="w-2/6 p-4 rounded bg-gray-900 flex flex-col gap-4">
          <div className="text-2xl font-semibold">Signin</div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="w-full px-3 py-2 rounded bg-gray-700  font-semibold"
            required
            autoComplete="off"
            value={data.username}
            onChange={change}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full px-3 py-2 rounded bg-gray-700  font-semibold"
            required
            autoComplete="off"
            value={data.password}
            onChange={change}
          />
          <div className="flex items-center justify-between">
            <button className="py-2 px-4 rounded border border-gray-600 hover:bg-slate-600" onClick={submit}>
              Signin
            </button>
            <div className="flex gap-2 text-gray-500">
              <h2>Don't have an Account?</h2>
              <Link to={"/signup"} className=" hover:text-white ">
                Click here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
