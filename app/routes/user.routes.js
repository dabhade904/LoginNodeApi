module.exports = (app) => {
    const users = require('../controller/user.controller');

    app.post('/users', users.create);

    app.get('/users', users.findAll);

    app.get('/find', users.findOne);

    app.post('/token',users.findToken);

    app.delete('/users/:userId', users.delete);
}