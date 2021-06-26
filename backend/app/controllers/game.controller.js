const Game = require('../models/game.model.js');
const GameStatus = require('../configs/game.configs.js');
const Sentencer = require('sentencer');

// Create and Save a new Game
exports.create = async (req, res) => {
    console.log(res.body)
    if(!req.body.gameUid) {
        return res.status(400).send({
            message: "GameUid1 can not be empty"
        })
    }

    const is_exists = await Game.exists({gameUid: req.body.gameUid});

    if(is_exists){
        return res.status(400).send({
            message: "GameUid must be unique"
        })
    }

    // Create a Game
    const game = new Game({
        gameUid: req.body.gameUid,
        status: GameStatus.RUNNING,
        actual_word: Sentencer.make("{{ noun }}"),
        missed_words: []
    });
    game.player_word = new Array(game.actual_word.length + 1).join("-");
    game.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Game."
        })
    })

};

// Find a single game with a gameUid
exports.findOne = (req, res) => {
    res.json({"message": "Single Game"});

};


// Update a game identified by the gameUid in the request
exports.addGameInput = async (req, res) => {
    res.json({"message": "Update Game"});
};
