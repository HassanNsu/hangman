const requestOptions = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
};
const gameUrl = "http://localhost:3001/game/";

// Api for Create a new Game
const CreatePostAPI = async (userUid) => {
    requestOptions.body = JSON.stringify({ gameUid: `${userUid}` });
    const apiData = await fetch(gameUrl, requestOptions)
        .catch((e) => {
            console.log(e);
        });
    return await apiData.json();
}

// Api for udate the game by adding a alphabet
const AddInputPostApi = async (word) => {
    requestOptions.body = JSON.stringify(word);
    const url = gameUrl + localStorage.getItem("gameUid");
    const apiData = await fetch(url, requestOptions)
        .catch((e) => {
            console.log(e);
        });
    return await apiData.json();
}

export { CreatePostAPI, AddInputPostApi };