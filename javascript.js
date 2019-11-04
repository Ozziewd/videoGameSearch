// var queryURL = "https://rawg-video-games-database.p.rapidapi.com"

// var queryRoute = ["/games", "/platforms", "/developers"]

// //the routeDropdown ID and dropdown still need to be built in the html
// var queryRouteUserSelection = $("#routeDropdown").val()

//the search bar has already been made
//var searchQuery = "/" + $("#searchBar").val().trim()

// var searchVGDB = function () {
//     $.ajax({
//         url: idot,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response)
//     });
// };

// if (queryRouteUserSelection === "games") {

//     queryURL += queryRoute[0]
//     //add desired game to queryUrl here
//     queryURL += searchQuery
//     searchVGDB()

// } else if (queryRouteUserSelection === "platforms") {

//     queryURL += queryRoute[1]
//     //add desired platform to queryUrl here
//     queryURL += searchQuery
//     searchVGDB()

// } else if (queryRouteUserSelection === "developers") {

//     queryURL += queryRoute[2]
//     //add desired developers to queryUrl here
//     queryURL += searchQuery
//     searchVGDB()

// } else {

//     console.log("no luck, we cant search that")

// }
$('#search').click(()=>{
    console.log('here')
    gameSearch()
})
function gameSearch() {
    console.log('clicked')
    var searchQuery = $("#searchBar").val().trim()
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rawg-video-games-database.p.rapidapi.com/games/"+searchQuery,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "75c364298amsh90cda0d2581c37fp13e40ejsn714ee801263f"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response)
        buildInfo(response)
    });
}
function buildInfo(response){
    $box = $('<div>').addClass('box')
    $article = $('<article>').addClass('media')
    $mediaLeft = $('<div>').addClass('media-left')
    $figure = $('<figure>').addClass('image')
    $img= $('<img>').attr('src',response.background_image)
    $img.width('200px')
    $mContent=$('<div>').addClass('media-content')
    $content=$('<div>').addClass('content')
    $pTag=$('<p>').html('<strong>'+response.name+'</strong>')
    if(response.esrb_rating === null){
        $rating=$('<div>').text('Rating: Not Rated')
    }
    else{
         $rating=$('<div>').text('Rating: '+response.esrb_rating.name)
    }
    $description=$('<div>').html('Description:'+response.description)
    var plats =""
    for(var i = 0; i< response.platforms.length; i++){
        plats += response.platforms[i].platform.name
        if(i!==response.platforms.length-1){
            plats+=", "
        }
    }
    $platforms=$('<div>').text('Platforms: '+plats)
    $pTag.append($rating, $description, $platforms)
    $content.append($pTag)
    $mContent.append($content)

    $figure.append($img)
    $mediaLeft.append($figure)
    $article.append($mediaLeft, $mContent)
    $box.append($article)
    $('#results').append($box)
    console.log(response);
}
{/* <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
          <br>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div> */}