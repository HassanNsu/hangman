const Game = require('../models/game.model.js');
const GameStatus = require('../configs/game.configs.js');
const Sentencer = require('sentencer');

// Create and Save a new Game
exports.create = async (req, res) => {

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

    Game.findOne({gameUid: req.params.gameUid})
    .then(game => {
        if(!game) {
            return res.status(404).send({
                message: "Game not found"
            });            
        }
        res.send(game);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Game not found"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Game"
        });
    });
};


// Update a game identified by the gameUid in the request
exports.addGameInput = async (req, res) => {
    if(!req.body.userInput) {
        return res.status(400).send({
            message: "User Input can not be empty"
        });
    }

    if(req.body.userInput.length > 1) {
        return res.status(400).send({
            message: "User Input has to be an alphabet"
        });
    }
    
    const game = await Game.findOne({gameUid: req.params.gameUid})

    let missed_alphabets = game.missed_words
    let status = game.status
    let player_word = game.player_word
    let alphabetPosition = game.actual_word.indexOf(req.body.userInput);

    if(missed_alphabets.includes(req.body.userInput) || player_word.includes(req.body.userInput)) {
        return res.status(400).send({
            message: "You already tried this alphabet"
        });
    }

    if(alphabetPosition < 0) {
        missed_alphabets.push(req.body.userInput)
        if(missed_alphabets.length > 6) {
            status = GameStatus.LOST
        }
    } else {
        var indexes = [];
        for(var i=0; i<game.actual_word.length; i++) {
            if (game.actual_word[i] === req.body.userInput) indexes.push(i);
        }
        for(var j=0; j<indexes.length; j++){
          player_word = player_word.substring(0, indexes[j]) + req.body.userInput + player_word.substring(indexes[j] + 1);
        }
    }

    if(player_word.indexOf("-") < 0) {
        status = GameStatus.WINNER
    }

    game.missed_words = missed_alphabets;
    game.status = status;
    game.player_word = player_word;
    game.save();
    res.send(game);
};