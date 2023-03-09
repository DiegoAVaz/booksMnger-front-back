import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import './login.css'
import { ImBook } from 'react-icons/im'

function Login(){

    const defaultUser = 'teste@teste'
    const defaultSenha = '123'

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function handleLogin(e){
        e.preventDefault()
        if(email === defaultUser && senha === defaultSenha){
            localStorage.setItem('isLoggedIn', true)
            setIsLoggedIn(true)
        }
    }

    return(
        <>

            {isLoggedIn ? (
                <Navigate to='/home' />
            ) : (
                <>
                <div className="container">
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
                        
                    </form>
                </div>
                </>
            )}
        </>
    )
}

export default Login
