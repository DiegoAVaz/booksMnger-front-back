module.exports = (app) => {
    app.route('/livros')
        .get(app.api.livros.get)
        .post(app.api.livros.save)
        
    app.route('/livros/:id')
        .delete(app.api.livros.remove)
        .get(app.api.livros.getById)
        .put(app.api.livros.save)
}