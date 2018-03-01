//It annoys me to have nothing on the first line


var authKey = "&api_key=0okaKOieB6FB0zsBq9TJUMetg3vw4g7K";

var topics = ["Big Bang Theory", "The Office", "30 Rock", "Southpark", "Futurama"];

function renderShows() {
    $("#buttonGoesHere").empty();

    for(var i = 0; i < topics.length; i++) {
        var showButton = $("<button>").text(topics[i]).addClass("clickButton").attr("data-name", topics[i]);
        $("#buttonGoesHere").append(showButton);
    }
}


function displayGifs() {

    $("#gifGoesHere").empty();
    var show = $(this).attr("data-name");
    console.log(show);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=0okaKOieB6FB0zsBq9TJUMetg3vw4g7K&limit=10"
    console.log(queryURL);
        
    $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function (response) {
            
        var results = response.data;
        console.log("var results: " + results);

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var showGif = $("<img>");
            showGif.attr("src", results[i].images.fixed_height.url);
            showGif.attr("data-still", results[i].images.fixed_height_still.url);
            showGif.attr("data-animate", results[i].images.fixed_height.url);
            showGif.attr("data-state", "animate");
            showGif.attr("class", "gif");
          

            gifDiv.prepend(p);
            gifDiv.prepend(showGif);

            $("#gifGoesHere").prepend(gifDiv);
            }
        });
 }

 
$("#submitButton").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the show name
    var tvShow = $("#showInput").val().trim();

    //pushing var tvShow to the topics array
    topics.push(tvShow);
   
    $('#showInput').val('');
    // running renderShows function to build the new button with click handler 
    renderShows();

});

function animateGif () {

    
    var state = $(this).attr("data-state");
  
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

}


$(document).on("click", ".clickButton", displayGifs);
$(document).on("click", ".gif", animateGif);

renderShows();


