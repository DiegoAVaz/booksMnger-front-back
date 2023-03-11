import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './cadastro.css'
import axios from 'axios'
import { ImBook } from 'react-icons/im'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cadastro(){


    const [users, setUsers] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    console.log(users)

    function handleRegister(e){
        e.preventDefault()
        if (!firstName || !lastName || !email || !senha) {
            toast.error('Por favor, preencha todos os campos.', {
                autoClose: 5000,
                theme: 'dark',
                position: 'bottom-left'
            })
            return
          }
        axios.post('http://localhost:5000/usuarios', {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "senha": senha
        }).then(res => {
            localStorage.setItem('isLoggedIn', true)
            setIsLoggedIn(true)
            toast.success('Cadastro realizado com sucesso!')
        }).catch(err => {
            toast.error('Não foi possível realizar o cadastro. Verifique os dados e tente novamente.')
        })
    }
    

    function getUsers(){
        axios.get('http://localhost:5000/usuarios')
          .then(res => {
            setUsers(res.data)
          })
      }
    
    useEffect(() => {
        getUsers()
    }, [])

    return(
        <>

            {isLoggedIn ? (
                <Navigate to='/home' />
            ) : (
                
                <div className="container">
                    <ImBook className='bookIcon'/>
                    <h1 className="login-title">CADASTRAR</h1>
                    <form onSubmit={handleRegister} className="login-form">
                        <fieldset className="cadastro-fieldset">
                            <input 
                                className='login-input' 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                type='text' 
                                placeholder="Digite seu primeiro nome" 
                            />
                            <input 
                                className='login-input' 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                type='text' 
                                placeholder="Digite seu último nome" 
                            />
                            <input 
                                className='login-input' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                type='email' 
                                placeholder="Digite seu email" 
                            />
                            <input 
                                className='login-input' 
                                value={senha} 
                                onChange={(e) => setSenha(e.target.value)}
                                type='password' 
                                placeholder="Faça uma senha" 
                            />
                            <button className="login-button" type='submit'>CADASTRAR E ENTRAR</button>
                        </fieldset>
                        <div className='linkCadastro'>
                            <Link to='/'>Já tem uma conta? Clique aqui e faça login!</Link>
                        </div>
                        
                    </form>
                    <ToastContainer/>
                </div>
                
            )}
        </>
    )
}

export default Cadastro