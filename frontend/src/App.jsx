
import './App.css'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import AllTasks from './pages/AllTasks'
import CompletedTasks from './pages/CompletedTasks'
import ImportantTasks from './pages/ImportantTasks'
import InCompleteTasks from './pages/InCompleteTasks'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authActions } from './store/auth'

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }else if(isLoggedIn === false){
      navigate("/signup");
    }
  },[]);


  return (
    <div className='bg-cyan-950 h-screen p-2 text-white relative'>
        <Routes>
          <Route exact path='/' element={<Home/>}>
            <Route index element={ <AllTasks/> }/>
            <Route path='/importantTasks'  element={ <ImportantTasks/> }/>
            <Route path='/completedTasks' element={ <CompletedTasks/> }/>
            <Route path='/incompleteTasks' element={ <InCompleteTasks/> }/>
          </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
        </Routes>
          
    </div>
  )
}

export default App
