$(window).load(function() {
  var searchArtists = function (query) {
      $.ajax({
          url: 'https://api.spotify.com/v1/search',
          data: {
              q: query,
              client_id: 'aadca442888c4fe6b93573a75d8ecb45',
              type: 'Artist',
              access_token: 'BQDMbtf60uMji4u6UhM-IScPQhv7FiZ1xdW7ctffanir2QC4poFDSPCMPGF3HGwenG01tCjzU48nS3RsXUdDkrX-e2cRTjSaKb0E0YUPdzhGGloRvCfqvPY0gy2sl1uAhr9sqtr9Wrwmy4ri',
              token_type: 'bearer',
          },
          success: function (response) {
            $response = JSON.parse(JSON.stringify(response));
            $imageUrl = $response.artists.items[0].images[0].url;
            console.log($imageUrl);
            $('#results').html($('<img>',{id:'artistPicture',src:$imageUrl}))
          }

      });
      console.log("asdsda");
  };

  document.getElementById('search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        searchArtists(document.getElementById('query').value);
  }, false);
});
