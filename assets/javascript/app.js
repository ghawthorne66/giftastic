console.log("Javascript file loaded");
var API_KEY = "F8P9q2z1W22t2GnQ3lUnRmz7BW1ffTig"

console.log("rendering")

var places = ["Spain", "Mexico", "Australia", "Tanzania"];

$("#add-place").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var place = $("#place-input").val().trim();

    // The movie from the textbox is then added to our array
    places.push(place);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < places.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("place");
      // Added a data-attribute
      a.attr("data-place", places[i]);
      
      // Provided the initial button text
      a.text(places[i]);
      // Added the button to the HTML
      $("#buttons-view").append(a);
    }
  }

  renderButtons()
  
  $(document).on("click", ".place", function() {   //change to document//
    event.preventDefault();
    console.log("Button clicked")
    var place = $(this).attr("data-place");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      place + "&api_key=" + API_KEY + "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log("We got a response! ");
        
        var results = response.data;
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var rating = results[i].rating;
            var still_url = results[i].images.original_still.url; 
            var animated_url = results[i].images.fixed_height.url;
            var gifDiv = $("<div>");
          
          ///gifDiv.addClass("gif");
          //gifDiv.attr("data-state", "still");
          //gifDiv.attr("data-animate", animated_url);
          //gifDiv.attr("data-still", still_url);
          

          var p = $("<p>").text("Rating: " + rating);

          var placeImage = $("<img>");
          

          // ADDED
          placeImage.attr("data-state", "still");
          placeImage.attr("data-animate", animated_url);
          placeImage.attr("data-still", still_url);
          placeImage.addClass("gif");
  
          placeImage.attr("src", still_url);

          gifDiv.prepend(p);
          gifDiv.prepend(placeImage);
          $("#gifs-appear-here").prepend(gifDiv);
          //attachEventListeners();




        }


        console.log("Adding event listener")
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(" ")
            console.log("--------------------------------")
            console.log("state: " + state);
           
            if (state == "still") {
                // get the animate url & set the src attribute
                $(this).attr("src", $(this).attr("data-animate"))
                // set the state attribute
                $(this).attr("data-state", "animate")
                console.log(" ")
                console.log(" ")
                console.log("Changing from still to animate new source: " + $(this).attr("src"));
                console.log("new state: " +$(this).attr("data-state"));
              } else {
                // get the still url & set the src attribute
                $(this).attr("src", $(this).attr("data-still"))
                // set the state attribute
                $(this).attr("data-state", "still");
                console.log(" ")
                console.log(" ")
                console.log("Changing from animate to still: " + $(this).attr("src"));
                console.log("new state: " +$(this).attr("data-state"));
              }
          })
          
      });
  });

//function attachEventListeners(){  //need to examine
    
//}


