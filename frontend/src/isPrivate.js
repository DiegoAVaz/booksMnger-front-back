import { Navigate } from "react-router-dom"

function Private({children}){

    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if(!isLoggedIn){
        return <Navigate to='/'/>
    }
    return children
}

export default Private