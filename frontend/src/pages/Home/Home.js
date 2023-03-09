import './home.css';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from 'axios'


function Home() {

  const [livros, setLivros] = useState()
  console.log(livros)

  const [livro, setLivro] = useState('')
  const [autor, setAutor] = useState('')


  function getBooks(){
    axios.get('http://localhost:5000/livros')
     // .then(res => console.log(res))
      .then(res => {
        setLivros(res.data)
      })
  }

  useEffect(() => {
    getBooks()
  }, [])

  return(
    <>
      <div className='container'>
          <div className='control'>
              <div className='cadTitle'>
                <h1>Cadastrar livro</h1>
              </div>
              <input 
                type="text" 
                value={livro}
                onChange={(e) => setLivro(e.target.value)}
                placeholder='Livro' 
                className='inputLivro'
              />
              <input 
                type="text" 
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder='Autor' 
                className='inputLivro'
              />
              <div className='btns'>
                <button type='submit' className='addButton'>ADICIONAR</button>
                <button type='submit' className='searchButton'>BUSCAR</button>
              </div>
          </div>
          <div className='listComps'>
            <div className='bookTitle'>
              <h3>O Mundo Assombrado Pelos Demônios</h3>
            </div>
            <div className='Author'>
              <p>Carl Sagan</p>
            </div>
            <div className='editDeleteIcons'>
              <AiFillEdit />
              <AiFillDelete/>
            </div>
          </div>
      </div>
    </>
  )
  
}

export default Home;
