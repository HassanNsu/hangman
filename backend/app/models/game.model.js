const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    gameUid: String,
    status: Number,
    actual_word: String,
    player_word: String,
    missed_words: [String],
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);