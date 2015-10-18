var blocJamsModule = angular.module('blocJams', ['ui.router']);

blocJamsModule.config(function($stateProvider, $locationProvider) {

    $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });

    $stateProvider.state('album', {
         url: '/album',
         controller: 'AlbumController',
         templateUrl: '/templates/album.html'
     });

    $stateProvider.state('collection', {
         url: '/collection',
         controller: 'CollectionController',
         templateUrl: '/templates/collection.html'
     });

    $stateProvider.state('landing', {
         url: '/landing',
         controller: 'LandingController',
         templateUrl: '/templates/landing.html'
     });

});



//Assignment 4
blocJamsModule.controller("AlbumController", [
  "$log",
  "$scope",
  function($log, $scope) {
    $log.debug("I am the AlbumController! Yipee! :)");
    $scope.albumPicasso = [ name, label, year, albumArtUrl, songs];
    $scope.name = "The Colors";
    $scope.label = "Cubism";
    $scope.year = "1881";
    $scope.albumArtUrl = "assets/images/album_covers/02.png";
    $scope.songs = [
                { name: 'Blue', length: '4:26', audioUrl: 'assets/music/blue' },
                { name: 'Green', length: '3:14', audioUrl: 'assets/music/green' },
                { name: 'Red', length: '5:01', audioUrl: 'assets/music/red' },
                { name: 'Pink', length: '3:21', audioUrl: 'assets/music/pink' },
                { name: 'Magenta', length: '2:15', audioUrl: 'assets/music/magenta' }
      ];
    }
  ]);


blocJamsModule.controller("LandingController", [
    "$log",
    "$scope",
    function($log, $scope){
        $log.debug("LandingController!!!");
        $scope.title = "Turn the music up!";
    }
]);


blocJamsModule.controller("CollectionController", [
    "$log",
    "$scope",
    function($log, $scope) {
      $log.debug("CollectionController");
        $scope.allAlbums = [
            albumPicasso, albumMarconi, tameImpala
            ];
            $scope.albumPicasso = [ name, artist, label, year, albumArtUrl, songs];
              $scope.albumPicasso.name = "The Colors";
              $scope.albumPicasso.artist = "Picasso";
              $scope.albumPicasso.label = "Cubism";
              $scope.albumPicasso.year = "1881";
              $scope.albumPicasso.albumArtUrl = "assets/images/album_covers/02.png";
              $scope.albumPicasso.songs = [
                        { name: 'Blue', length: '4:26', audioUrl: 'assets/music/blue' },
                        { name: 'Green', length: '3:14', audioUrl: 'assets/music/green' },
                        { name: 'Red', length: '5:01', audioUrl: 'assets/music/red' },
                        { name: 'Pink', length: '3:21', audioUrl: 'assets/music/pink' },
                        { name: 'Magenta', length: '2:15', audioUrl: 'assets/music/magenta' }
              ];
            $scope.albumMarconi = [ name, artist, label, year, albumArtUrl, songs];
              $scope.albumMarconi.name = "The Telephone";
              $scope.albumMarconi.artist = "Guglielmo Marconi";
              $scope.albumMarconi.label = "EM";
              $scope.albumMarconi.year = "1909";
              $scope.albumMarconi.albumArtUrl = "assets/images/album_covers/20.png";
              $scope.albumMarconi.songs = [
                { name: 'Hello, Operator?', length: '1:01' },
                { name: 'Ring, ring, ring', length: '5:01' },
                { name: 'Fits in your pocket', length: '3:21'},
                { name: 'Can you hear me now?', length: '3:14' },
                { name: 'Wrong phone number', length: '2:15'}
              ];
          $scope.tameImpala = [ name, artist, label, year, albumArtUrl, songs];
            $scope.tameImpala.name = "Currents";
            $scope.tameImpala.artist = "Tame Impala";
            $scope.tameImpala.label = "Modular";
            $scope.tameImpala.year = "2015";
            $scope.tameImpala.albumArtUrl = "assets/images/album_covers/22.png";
            $scope.tameImpala.songs = [
              { name: 'Let It Happen', length: '7:46' },
              { name: 'Nangs', length: '1:47' },
              { name: 'The Moment', length: '4:15'},
              { name: 'Yes I\'m Changing', length: '4:30' },
              { name: 'Eventually', length: '5:19'}
            ];
        }
    ]);

//Assignment 5
var module = angular.module('blocJams', []);
module.service('songPlayer', function() {
  var currentAlbum = null;
  var currentlyPlayingSongNumber = null;
  var currentSongFromAlbum = null;
  var currentSoundFile = null;
  var currentVolume = 80;

  var setVolume = function(volume) {

      if(currentSoundFile) {
        currentSoundFile.setVolume(volume);
      }
  };

  var trackIndex = function(album, song) {
      return album.songs.indexOf(song);
  };

  var updateSeekBarWhileSongPlays = function() {

      if (currentSoundFile) {
        currentSoundFile.bind('timeupdate', function(event) {
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
      }
    };

    return {
        setSong: function(songNumber) {
          if (currentSoundFile) {
            currentSoundFile.stop();
          }

          currentlyPlayingSongNumber = parseInt(songNumber);
          currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

          currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
            formats: [ 'mp3' ],
            preload: true
          });

          setVolume(currentVolume);
          },
        seek: function(time) {
          if(currentSoundFile){
            currentSoundFile.setTime(time);
          }
        },
        setCurrentAlbum: function(album){
          currentAlbum = album;
        },
        updateSeekBarWhileSongPlays: function(){
          if (currentSoundFile) {
              currentSoundFile.bind('timeupdate', function(event) {
                var seekBarFillRatio = this.getTime() / this.getDuration();
                var $seekBar = $('.seek-control .seek-bar');

            updateSeekPercentage($seekBar, seekBarFillRatio);
              });
          }
        },
        seek: function(time) {
          if (currentSoundFile) {
              currentSoundFile.setTime(time);
            }
        },
        play: function() {
            if (currentlyPlayingSongNumber === null) {
              this.setSong(0);
            }
            this.playing = true;
            currentSoundFile.play();
            return currentAlbum.songs[currentSongIndex];
        },
        pause: function() {
            this.playing = false;
            currentSoundFile.pause();
        },
        next: function(){
            var getLastSongNumber = function(index) {
              return index == 0 ? currentAlbum.songs.length : index;
            };

            var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
              currentSongIndex = 0;
            }

            setSong(currentSongIndex + 1);
            currentSoundFile.play();
            updatePlayerBarSong();
            updateSeekBarWhileSongPlays();

            var lastSongNumber = getLastSongNumber(currentSongIndex);
            var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
            var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

            $nextSongNumberCell.html(pauseButtonTemplate);
            $lastSongNumberCell.html(lastSongNumber);
        },
        previous: function(){
          var getLastSongNumber = function(index) {
            return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
          };

          var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
          currentSongIndex--;

          if (currentSongIndex < 0) {
            currentSongIndex = currentAlbum.songs.length - 1;
          }

          setSong(currentSongIndex + 1);
          currentSoundFile.play();
          updatePlayerBarSong();
          updateSeekBarWhileSongPlays();

          var lastSongNumber = getLastSongNumber(currentSongIndex);
          var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
          var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

          $previousSongNumberCell.html(pauseButtonTemplate);
          $lastSongNumberCell.html(lastSongNumber);
        }
    }
});
