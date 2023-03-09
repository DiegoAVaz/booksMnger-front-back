import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home/Home'
import Private from './isPrivate'

function Router(){
    return(
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Private><Home/></Private>}/>
            </Routes>
    )
}

export default Router