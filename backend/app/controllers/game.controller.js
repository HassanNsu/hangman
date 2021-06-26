

// Create and Save a new Game
exports.create = async (req, res) => {
    res.json({"message": "Create a new game"});


};

// Find a single game with a gameUid
exports.findOne = (req, res) => {
    res.json({"message": "Single Game"});

};


// Update a game identified by the gameUid in the request
exports.addGameInput = async (req, res) => {
    res.json({"message": "Update Game"});
};
