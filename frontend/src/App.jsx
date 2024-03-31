
import './App.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import AllTasks from './pages/AllTasks'
import CompletedTasks from './pages/CompletedTasks'
import ImportantTasks from './pages/ImportantTasks'
import InCompleteTasks from './pages/InCompleteTasks'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {

  return (
    <div className='bg-cyan-950 h-screen p-2 text-white relative'>
      <Router>
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
      </Router>
          
    </div>
  )
}

export default App
