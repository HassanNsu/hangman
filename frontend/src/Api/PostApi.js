
const PostApi = async (userUid) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        body: JSON.stringify({ gameUid: `${userUid}`})
    };
    console.log(requestOptions);
    const apiData = await fetch('http://localhost:3001/game/', requestOptions)
        .catch((e) => {
            console.log(e);
        });

    return await apiData.json();

}

export default PostApi;