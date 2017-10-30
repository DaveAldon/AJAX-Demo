$.urlParam = function(name){
  results = new RegExp('(' + name + '=)([^&#]*)').exec(window.location.href);
  if (results==null){
     return null;
  }
  else {
    console.log(results);
    return decodeURI(results[2]) || 0;
  }
}

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
      success: function (response) {
        imageUrl = response.artists.items[0].images[0].url;
        console.log(imageUrl);
        $('#results').html($('<img>',{id:'artistPicture',src:imageUrl}))
      }
  });
};

$(document).ready(function() {
  $("#login").click(function(){
    $.ajax({
      method: "GET",
      url: "https://accounts.spotify.com/authorize",
      data: {
        client_id: 'aadca442888c4fe6b93573a75d8ecb45',
        response_type: 'token',
        redirect_uri: 'https://davealdon.github.io/AJAX-Demo/'
      },
      complete : function(){
        $(location).attr('href', this.url)
      }
    });
  });

  $("#search").click(function(){
    searchArtists($("#query").val());
    $("#query").val('');
  });
});
