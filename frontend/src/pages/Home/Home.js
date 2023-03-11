import './home.css';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {

  const [livros, setLivros] = useState([])
  const [editing, setEditing] = useState(false)
  const [livroId, setLivroId] = useState(null)
  const [livro, setLivro] = useState('')
  const [autor, setAutor] = useState('')

  function handleDelete(id){
    axios.delete(`http://localhost:5000/livros/${id}`)
      .then(response => {
        console.log(response.data)
        setLivros(livros.filter(livro => livro.id !== id))
        toast('Livro deletado com sucesso.', {
          autoClose: 5000,
          position: 'bottom-left',
          theme: 'dark'

        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  function handleEditing(id){
    const livroEdit = livros.find(item => item.id === id)
    setLivro(livroEdit.name)
    setAutor(livroEdit.author)
    setLivroId(livroEdit.id)
    window.scrollTo(0, 0)
  }

  function edit(){
    axios.put(`http://localhost:5000/livros/${livroId}`, {
      "name": livro,
      "author": autor
    })
      .then(response => {
        console.log(response.data)
        toast('Livro atualizado com sucesso.', {
          autoClose: 5000,
          position: 'bottom-left',
          theme: 'dark'
        })
        getBooks()
      })
      .catch(error => {
        console.log(error)
      })
      setLivro('')
      setAutor('')
      setLivroId(null)
      setEditing(false)
  }

  function handlePost(){
    axios.post('http://localhost:5000/livros', {
      "name": livro,
      "author": autor
    })
      .then(response => {
        console.log(response.data)
        toast('Livro cadastrado com sucesso.', {
          autoClose: 5000,
          position: 'bottom-left',
          theme: 'dark'
        })
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
  }, [livros])

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
                { editing ? (
                  <button type='submit' onClick={edit} className='addButton'>SALVAR</button>
                ) : (
                  <button type='submit' onClick={handlePost} className='addButton'>ADICIONAR</button>
                )}
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
                <AiFillEdit onClick={() => {
                  handleEditing(item.id)
                  setEditing(true)
                  }}  
                  style={{ 'cursor': 'pointer' }} 
                />
                <AiFillDelete onClick={() => handleDelete(item.id)} style={{ 'cursor': 'pointer' }} />
              </div>
            </div>
          ))}
          <ToastContainer/>
      </div>
    </>
  )
  
}

export default Home;
