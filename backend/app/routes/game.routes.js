module.exports = (app) => {

    const game = require('../controllers/game.controller.js');

    app.post('/game', game.create);


    app.get('/game/:gameUid', game.findOne);


    app.post('/game/:gameUid', game.addGameInput)


}