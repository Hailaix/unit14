console.log("Let's get this party started!");


//http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym
async function giphyrequest(q){
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", { params: {
        q,
        api_key:"MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym", //hard coded because I think its the only one we have access to.
    }});
    const returnurl = res.data.data[Math.floor(Math.random()*res.data.data.length)].url
    console.log(returnurl);
    return returnurl;
}

const imgdiv = document.getElementById('imgdiv');
const searchform = document.getElementById('searchform');

searchform.addEventListener('submit', async function(e){
    e.preventDefault();
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", { params: {
        q: e.target['q'].value,
        api_key:"MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym", //hard coded because I think its the only one we have access to.
    }});
    console.log(res);
    const imgurl = res.data.data[Math.floor(Math.random()*res.data.data.length)].url; //random gif url
    const newimg = document.createElement('img');
    newimg.src = imgurl;
    imgdiv.append(newimg);
});