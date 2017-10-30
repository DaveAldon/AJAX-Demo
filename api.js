// This function retrieves the token from our url
$.urlParam = function(name){
  results = new RegExp('(' + name + '=)([^&#]*)').exec(window.location.href);
  if (results==null){
     return null;
  }
  else {
    return decodeURI(results[2]) || 0;
  }
}

// Table definition for artist result
var results_table =
  "<table id='rt'>" +
  "<tr><td id='pic' rowspan=2></td>" +
  "<td id='name'></td></tr>" +
  "<tr><td id='about'></td>" +
  "</tr></table";

// This function uses our token to send an api to spotify in order to get
// information about an artist
var searchArtists = function (query) {
  $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
          q: query,
          client_id: 'aadca442888c4fe6b93573a75d8ecb45',
          type: 'Artist',
          access_token: $.urlParam('access_token'),
          token_type: 'bearer',
      },
      // Upon success of the api message, we get the contents and parse through it
      success: function (response) {
        imageUrl = response.artists.items[0].images[0].url;
        $('#results').html(results_table);
        $('#pic').html($('<img>',{id:'artistPicture',src:imageUrl}));
        $('#name').append(response.artists.items[0].name);
        $('#about').append('Genres: ' + response.artists.items[0].genres.join(", "));
      }
  });
};

// Button click events
$(document).ready(function() {
  // When we login, we send the user to spotify's authorization page
  $("#login").click(function(){
    $.ajax({
      method: "GET",
      url: "https://accounts.spotify.com/authorize",
      data: {
        client_id: 'aadca442888c4fe6b93573a75d8ecb45',
        response_type: 'token',
        redirect_uri: 'http://localhost:8000'
        //redirect_uri: 'https://davealdon.github.io/AJAX-Demo/'
      },
      // When we're done, we go to spotify's site. The user continues and is
      // sent back according to our redirect_uri
      complete : function(){
        $(location).attr('href', this.url)
      }
    });
  });

  // Search event where the text box contents are sent to our query
  // The results are faded into view
  $("#search").click(function(){
    searchArtists($("#query").val());
    $("#query").val('');
    $('#results').css('visibility','visible').hide().fadeIn("slow");
  });
});
