console.log("Let's get this party started!");
//http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym
async function giphyrequest(q){
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", { params: {
        q,
        api_key:"MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }});
    console.log(res);
}

async function giphytest(){
    const res = await axios.get("https://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym");
    console.log(res);
}