import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CookiesProvider} from "react-cookie";
import './App.css'
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route> 
        <Route path='/create' element={<Create />}></Route>
        <Route path='/create/:id' element={<Create />}></Route>
        <Route path='/update' element={<Update />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
