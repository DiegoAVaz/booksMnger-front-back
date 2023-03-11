import { ImBook } from 'react-icons/im'
import { Link, useLocation } from 'react-router-dom'
import './styles.css'

function Header(){

    const location = useLocation()
    

    function handleLogout(){
        localStorage.removeItem('isLoggedIn')
        
    }

    return(
        <div className="containerHeader">
            <ImBook className='logo'/>
            { location.pathname !== '/' && location.pathname !== '/cadastro' ? (
                <Link to='/' type='submit' onClick={() => handleLogout()} className='logoutButton'>SAIR</Link>
            ) : null }
        </div>
    )
}

export default Header