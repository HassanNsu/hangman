// Api for returing a single game with a gameUid
const GetApi = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    const url = "http://localhost:3001/game/" + localStorage.getItem("gameUid");
    const apiData = await fetch(url, requestOptions)
        .catch((e) => {
            console.log(e);
        });
    return await apiData.json();
}

export { GetApi };
