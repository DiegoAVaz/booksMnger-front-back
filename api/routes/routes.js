module.exports = (app) => {
    app.route('/livros')
        .get(app.api.livros.get)
        .post(app.api.livros.save)
        
    app.route('/livros/:id')
        .delete(app.api.livros.remove)
        .get(app.api.livros.getById)
        .put(app.api.livros.save)

    app.route('/login')
        .get(app.api.login.auth)
        .post(app.api.login.auth)
    
    app.route('/usuarios')
        .get(app.api.users.get)
        .post(app.api.users.save)
}