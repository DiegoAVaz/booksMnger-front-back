import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './login.css'
import { ImBook } from 'react-icons/im'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function Login(){

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    
function handleLogin(e){
    e.preventDefault()

    axios.post('http://localhost:5000/login', {
        email,
        senha
    }).then(res => {
        console.log(res)
        localStorage.setItem('isLoggedIn', true)
        setIsLoggedIn(true)
    }).catch(error => {
      toast("Email ou senha inválidos. Verifique-os e tente novamente.", { 
        autoClose: 5000,
        position: 'bottom-left',
        theme: 'dark'
      })
    })
  }

    return(
        <>

            {isLoggedIn ? (
                <Navigate to='/home' />
            ) : (
                
                <div className="login-container">
                    <ImBook className='bookIcon'/>
                    <h1 className="login-title">LOGIN</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        <fieldset className="login-fieldset">
                            <input 
                                className='login-input' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                type='email' 
                                placeholder="Email" 
                            />
                            <input 
                                className='login-input' 
                                value={senha} 
                                onChange={(e) => setSenha(e.target.value)}
                                type='password' 
                                placeholder="Senha" 
                            />
                            <button className="login-button" type='submit'>ENTRAR</button>
                        </fieldset>
                        <div className='linkCadastro'>
                            <Link to='/cadastro'>Ainda não tem uma conta? Clique aqui e cadastre-se!</Link>
                        </div>
                        
                    </form>
                    
                    <ToastContainer/>
                </div>
                
            )}
        </>
    )
}

export default Login
