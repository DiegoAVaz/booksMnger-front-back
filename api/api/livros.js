module.exports = (app) => {


    const get = async (req, res) => {
        const testBook = await app.database('livros').select('*')

        return res.status(200).json(testBook)

    }

    const getById = async (req, res) => {

        const livroId = req.params.id

        if(!livroId){
            res.json({ msg: "Id não informado" })
        }

        const livroAlreayExists = await app.database('livros').where({ id: livroId }).first()

        if(!livroAlreayExists){
            return res.status(400).json({ msg: "Livro não encontrado" })
        }

        const livro = await app.database('livros').where({ id: livroId }).first()

        return res.status(200).json(livro)

    }

    const save = async (req, res) => {

        const livro = { ... req.body }

        if(req.params.id){
            livro.id = req.params.id
        }

        if(!livro.name){
            return res.json({ error: "Nome do livro não informado" })
        }

        if(req.params.id){
            app
                .database('livros')
                .update(livro)
                .where({ id: livro.id })
                .then((_) => res.status(201).send())
                .catch((err) => res.status(500).send(err))
        }else{
            const livroExists = await app
            .database("livros")
            .where({ name: livro.name })
            .first()

            if(livroExists){
                return res.status(400).json({ error: "O livro já está listado" })
            }else{
                app
                    .database('livros')
                    .insert(livro)
                    .then((_) => res.status(200).send)
                    .catch((err) => res.status(500).send(err))
            }
        }
        return res.json(livro)

    }

    const remove = async (req, res) => {

        const livroId = req.params.id

        if(!livroId){
            return res.status(400).json({ msg: "Id não informado" })
        }

        const livroAlreayExists = await app.database('livros').where({ id: livroId }).first()

        if(!livroAlreayExists){
            return res.status(400).json({ msg: "Livro não encontrado" })
        }

        await app.database('livros').where({ id: livroId }).del()

        res.status(204).send()

    }



    return { get, save, remove, getById }
}