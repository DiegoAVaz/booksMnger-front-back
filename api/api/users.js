module.exports = (app) => {


    const get = async (req, res) => {
        const users = await app.database('users').select('*')

        return res.status(200).json(users)

    }

    const save = async (req, res) => {

        const user = { ... req.body }

        if(req.params.id){
            user.id = req.params.id
        }

        if(!user.firstName){
            return res.json({ error: "Primeiro nome não informado" })
        }

        if(!user.lastName){
            return res.json({ error: "Último nome não informado" })
        }

        if(!user.email){
            return res.json({ error: "Último nome não informado" })
        }

        if(!user.senha){
            return res.json({ error: "Senha não informada" })
        }

        

        app
            .database('users')
            .insert(user)
            .then((_) => res.status(200).send)
            .catch((err) => res.status(500).send(err))

        return res.json(user)
    }

    return { get, save }
}