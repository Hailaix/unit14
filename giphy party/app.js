console.log("Let's get this party started!");


//http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym
async function giphyrequest(q){
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", { params: {
        q,
        api_key:"MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym", //hard coded because I think its the only one we have access to.
    }});
    const returnurl = res.data.data;
    console.log(returnurl);
    return returnurl;
}

const imgdiv = document.getElementById('imgdiv');
const searchform = document.getElementById('searchform');
const rmbtn = document.getElementById('rmbtn');

searchform.addEventListener('submit', async function(e){
    e.preventDefault();
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", { params: {
        q: e.target['q'].value,
        api_key:"MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym", //hard coded because I think its the only one we have access to.
    }});
    console.log(res);
    const imgurl = res.data.data[Math.floor(Math.random()*res.data.data.length)].images.original.url; //random gif url
    const newimg = document.createElement('img');
    newimg.src = imgurl;
    newimg.classList.add('col-12', 'col-sm-6', 'col-lg-4', 'my-2');
    // const divcol = document.createElement('div');
    // divcol.classList.add('col-12', 'col-sm-6', 'col-lg-4');
    // divcol
    imgdiv.append(newimg);
});
rmbtn.addEventListener('click', function(e){
    imgdiv.innerHTML = '';
});