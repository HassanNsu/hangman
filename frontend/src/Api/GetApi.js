
const GetApi = async () => {

    const requestOptions = {
        method: 'GRT',
        //mode: 'no-cors',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

    };

    const url ="http://localhost:3001/game/"+ localStorage.getItem("gameUid");

    const apiData = await fetch(url)
        .catch((e) => {
            console.log(e);
        });


    return await apiData.json();

}

export default GetApi;
