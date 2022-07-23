/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  const res = await axios.get("http://api.tvmaze.com/search/shows", { params: { q: query } });
  //console.log(res);
  const showlist = [];
  //we want res.data[show][id, image[original], name, summary]
  for (let obj of res.data) {
    const show = {
      id: obj.show.id,
      name: obj.show.name,
      summary: obj.show.summary,
      image: 'https://tinyurl.com/tv-missing'
    };
    if (obj.show.image !== null) {
      show['image'] = obj.show.image.original;
    }
    showlist.push(show);
  }
  return showlist;
};



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
          <img class="card-img-top" src=${show.image}>
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-success">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
};


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  //console.log(res);
  const episodes = [];
  //we want res.data[episode][id, name, season, number]
  for (let episode of res.data) {
    const tempisode = {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    }
    episodes.push(tempisode);
  }
  return episodes;
};


/** Populate the episodes list:
 *     - given an array of episodes, add those episodes to the DOM
 */
function populateEpisodes(episodes) {
  //show the episodes area if it is hidden
  $("#episodes-area").show();
  //grab the episodes list DOM element and empty it
  const $episodelist = $('#episodes-list');
  $episodelist.empty();
  //fill the episodes list with new LIs of each episode
  for (let episode of episodes) {
    const $item = $(
      `<li data-episode-id="${episode.id}">${episode.name} (season ${episode.season}, number ${episode.number})</li>`
    );
    $episodelist.append($item);
  }
}

//handles clicks on a btn class element within shows-list
$("#shows-list").on('click', '.btn', async function(e){
  //from the target, find the closest element with the card class and get the data element show-id
  const showid = $(e.target).closest('.card').data('show-id');
  console.log(showid);
  //request the episode list of that id from the api
  const elist = await getEpisodes(showid);
  //finally populate the DOM with the list
  populateEpisodes(elist);
});