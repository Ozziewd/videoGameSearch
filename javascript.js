$('#search').click(function (event) {
    event.preventDefault();
    console.log('here')
    gameSearch()
    $("#searchBar").val("")
})
function gameSearch() {
    console.log('clicked')
    var searchQuery = $("#searchBar").val().trim()
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rawg-video-games-database.p.rapidapi.com/games/" + searchQuery,
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
function buildInfo(response) {
    $box = $('<div>').addClass('box')
    $article = $('<article>').addClass('media')
    $mediaLeft = $('<div>').addClass('media-left')
    $figure = $('<figure>').addClass('image')
    $img = $('<img>').attr('src', response.background_image)
    $img.width('200px')
    $mContent = $('<div>').addClass('media-content')
    $content = $('<div>').addClass('content')
    $pTag = $('<p>').html('<strong class="gameTitle">' + response.name + '</strong>')
    whereModalGoes = $("<button>").addClass("openModal").text("Videos")
    if (response.esrb_rating === null) {
        $rating = $('<div>').text('Rating: Not Rated')
    }
    else {
        $rating = $('<div>').text('Rating: ' + response.esrb_rating.name)
    }
    $description = $('<div>').html('Description:' + response.description)
    var plats = ""
    for (var i = 0; i < response.platforms.length; i++) {
        plats += response.platforms[i].platform.name
        if (i !== response.platforms.length - 1) {
            plats += ", "
        }
    }
    $platforms = $('<div>').text('Platforms: ' + plats)
    $pTag.append($rating, $description, $platforms)
    $content.append($pTag)
    $mContent.append($content)

    $figure.append($img)
    $mediaLeft.append($figure, whereModalGoes)
    $article.append($mediaLeft, $mContent)
    $box.append($article)

    $('#results').prepend($box)
    console.log(response);

    $(".openModal").on("click", function () {
        $(".modal").addClass("is-active")


        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + response.name + "trailer" + "&key=AIzaSyD5zrZlNG4XNCYghghOKhT8tP6ZNkkp6Eg"


        function getYTVidId(theUrl) {

            var YTdata = new XMLHttpRequest();

            YTdata.open("GET", theUrl, false); 
            YTdata.send(null);

            return YTdata.responseText;
        }


        var YTResults = JSON.parse(getYTVidId(queryURL))

        var embedSRC = "https://www.youtube.com/embed/" + YTResults.items[0].id.videoId;

        $(".embeddedYT").attr("src", embedSRC)

    })

    $(".modal-close").on("click", closeModel)
    function closeModel () {
        $(".modal").removeClass("is-active")
    }
}