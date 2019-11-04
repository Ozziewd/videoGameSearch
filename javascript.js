var queryURL = "https://rawg-video-games-database.p.rapidapi.com"

var queryRoute = ["/games", "/platforms", "/developers"]

//the routeDropdown ID and dropdown still need to be built in the html
var queryRouteUserSelection = $("#routeDropdown").val()

//the search bar has already been made
var searchQuery = "/" + $("#searchBar").val().trim()

var searchVGDB = function() {
    $.ajax({
      url:idot,
      method: "GET"
    }).then(function(response) {
        console.log(response)
    });
};

if (queryRouteUserSelection === "games") {

    queryURL += queryRoute[0]
    //add desired game to queryUrl here
    queryURL += searchQuery
    searchVGDB()

} else if (queryRouteUserSelection === "platforms") {

    queryURL += queryRoute[1]  
    //add desired platform to queryUrl here
    queryURL += searchQuery
    searchVGDB()

} else if (queryRouteUserSelection === "developers") {

    queryURL += queryRoute[2]
    //add desired developers to queryUrl here
    queryURL += searchQuery
    searchVGDB()

} else {

    console.log("no luck, we cant search that")
    
}