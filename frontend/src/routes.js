import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home/Home'
import Private from './isPrivate'
import Cadastro from './pages/Cadastro/Cadastro'

function Router(){
    return(
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/home' element={<Private><Home/></Private>}/>
            </Routes>
    )
}

export default Router