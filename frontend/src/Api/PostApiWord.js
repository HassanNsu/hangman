const PostApiWord = async (word) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        body: JSON.stringify(word)
    };

    console.log(requestOptions);

    const url ="http://localhost:3001/game/"+ localStorage.getItem("gameUid");

    const apiData = await fetch(url, requestOptions)
        .catch((e) => {
            console.log(e);
        });

    return await apiData.json();

}

export default PostApiWord;