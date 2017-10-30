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
      // Upon success of the api message, we get the contents and parse through it.
      // If there are any missing values or no records found, we let the user know
      success: function (response) {
        $('#results').html(results_table);
        if(!jQuery.isEmptyObject(response.artists.items)) {
          try {
            imageUrl = response.artists.items[0].images[0].url;
            $('#pic').html($('<img>',{id:'artistPicture',src:imageUrl}));
          }
          catch(err) {
            $('#pic').html('<b>No image provided</b>');
          }
          genre = response.artists.items[0].genres.join(", ");
          if(!genre.length > 0) genre = 'None provided';
          $('#name').append(response.artists.items[0].name);
          $('#about').append('Genres: ' + genre);
        }
        else {
          $('#results').html('<b>No results found</b>');
        }
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
      complete: function(){
        $(location).attr('href', this.url)
      }
    });
  });

  // Restricts user input to numbers and letters
  $('#query').keypress(function(key) {
    if(((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 45)) && (key.charCode < 48 || key.charCode > 57)) {
      return false;
    }
  });

  // Search event where the text box contents are sent to our query
  // The results are faded into view
  $("#search").click(function(){
    if(!jQuery.trim($("#query").val()).length > 0) {
      $("#query").val('');
      $('#results').html('<b>Please enter an artist\'s name</b>');
      $('#results').css('visibility','visible').hide().fadeIn("slow");
      return false;
    }
    searchArtists($("#query").val());
    $("#query").val('');
    $('#results').css('visibility','visible').hide().fadeIn("slow");
  });
});
