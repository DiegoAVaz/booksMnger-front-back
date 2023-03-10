import './home.css';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from 'axios'


function Home() {

  const [livros, setLivros] = useState([])

  const [livro, setLivro] = useState('')
  const [autor, setAutor] = useState('')

  function handleEdit(id){
    const livroEdit = livros.find(item => item.id === id)
    setLivro(livroEdit.name)
    setAutor(livroEdit.author)
  }

  function handlePost(){
    axios.post('http://localhost:5000/livros', {
      "name": livro,
      "author": autor
    })
      .then(response => {
        console.log(response.data)
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
      setLivro('')
      setAutor('')

  }

  function getBooks(){
    axios.get('http://localhost:5000/livros')
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
                <button type='submit' onClick={handlePost} className='addButton'>ADICIONAR</button>
                <button type='submit' className='searchButton'>BUSCAR</button>
              </div>
          </div>
          {livros.map((item) => (   
            <div key={item.id} className='listComps'>
              <div className='bookTitle'>
                <h3>{item.name}</h3>
              </div>
              <div className='Author'>
                <p>{item.author}</p>
              </div>
              <div className='editDeleteIcons'>
                <AiFillEdit onClick={() => handleEdit(item.id)} style={{ 'cursor': 'pointer' }} />
                <AiFillDelete/>
              </div>
            </div>
          ))}
      </div>
    </>
  )
  
}

export default Home;
