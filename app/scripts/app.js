//app
var blocJamsModule = angular.module('blocJamsModule', ['ui.router']);

blocJamsModule.config(function($stateProvider, $locationProvider) {
  //configure application's path
  $locationProvider.html5Mode({
    //disable hashbangs in url
    enabled: true,
    //avoid common $location errors
    requireBase: false
  });

  $stateProvider
    .state('landing', {
      url: '/landing',
      controller: 'LandingController',
      templateUrl: '/templates/landing.html'
    })
    .state('collection', {
      url: '/collection',
      controller: 'CollectionController',
      templateUrl: '/templates/collection.html'
    })
    .state('album', {
      url: '/album',
      controller: 'AlbumController',
      templateUrl: '/templates/album.html'
    });
});


//Landing Controller
blocJamsModule.controller("LandingController", ["$scope", "$rootScope", function($scope, $rootScope) {
  $scope.title = "Turn the music up!";
  $rootScope.bodyClass = "landing";
  var points = document.getElementsByClassName('point');
  var revealPoint = function() {
    for (var i = 0; i < 3; i++) {
      points[i].style.opacity = 1;
      points[i].style.transform = "scaleX(1) translateY(0)";
      points[i].style.msTransform = "scaleX(1) translateY(0)";
      points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }
  };
  revealPoint();
}]);

//collectionController
blocJamsModule.controller("CollectionController", ["$scope", "$rootScope", function($scope, $rootScope) {
  //Defines array with album.js info
  $scope.albums = [albumPicasso, albumMarconi, tameImpala, albumPicasso, albumMarconi, tameImpala, albumPicasso, albumMarconi, tameImpala];
  $rootScope.bodyClass = "collection";
}]);

// albumController
blocJamsModule.controller("AlbumController", ["$scope", "$rootScope", "MusicPlayer", function($scope, $rootScope, MusicPlayer) {
	// $log.debug("AlbumController");
	$scope.album = albumPicasso;
  MusicPlayer.setCurrentAlbum(albumPicasso);
  $rootScope.bodyClass = "album";
  $scope.playingTrackIndex = MusicPlayer.currentSongIndex();
  $scope.togglePlay = $scope.playingTrackIndex === null || MusicPlayer.isPaused();
  $scope.volume = 80;

  $scope.$watch('volume', function() {
    MusicPlayer.setVolume($scope.volume);
  });

  $scope.$watch('trackProgress', function() {
    if ($scope.trackProgress === undefined) {
      return;
    }
    if (Math.abs(MusicPlayer.getTime() / MusicPlayer.getDuration() * 100 - $scope.trackProgress) > 1) {
      MusicPlayer.setTime($scope.trackProgress / 100 * MusicPlayer.getDuration());
    }
  });

  window.skope = $scope;

  $scope.updateSeekBarWhileSongPlays = function() {
    $scope.trackProgress = (MusicPlayer.getTime() / MusicPlayer.getDuration()) * 100;
    if (MusicPlayer.getTime() === MusicPlayer.getDuration()) {
      $scope.nextSong();
    }
  };
  $scope.listener = function() {
    MusicPlayer.registerProgressListener(function() {
      $scope.$digest();
      $scope.$apply(function() {
        $scope.updateTime();
        $scope.updateDuration();
        $scope.updateSeekBarWhileSongPlays();
      })
    });
  };
  $scope.listener();
  $scope.updateDuration = function() {
    if ($scope.playingTrackIndex !== null) {
      $scope.duration = MusicPlayer.getDuration();
    }
  };
  $scope.updateTime = function() {
    if ($scope.playingTrackIndex !== null) {
      $scope.time = MusicPlayer.getTime();
    }
  };
  $scope.infoShow = function() {
    return $scope.playingTrackIndex !== null;
  };
  $scope.togglePlayPause = function() {
    $scope.togglePlay = MusicPlayer.togglePlayFromPlayerBar();
    if ($scope.playingTrackIndex === null) {
      $scope.playingTrackIndex = 0;
    }
    if (!$scope.togglePlay || ($scope.togglePlay && $scope.playingTrackIndex === null)) {
      $scope.listener();
    }
  };
  $scope.enterHover = function(index) {
    $scope.hoveredIndex = index;
  };
  $scope.leaveHover = function(index) {
    $scope.hoveredIndex = null;
  };
  $scope.hideTrack = function(index) {
    return $scope.hoveredIndex === index || $scope.playingTrackIndex === index;
  };
  $scope.isPaused = function() {
    return MusicPlayer.isPaused();
  };
  $scope.pauseSong = function(index) {
    MusicPlayer.pause();
    $scope.playingTrackIndex = index;
    $scope.togglePlay = true;
  };
  $scope.playSong = function(index) {
    if ($scope.playingTrackIndex !== index) {
      MusicPlayer.setSong(index + 1);
    }
    $scope.playingTrackIndex = index;
    MusicPlayer.play();
    $scope.listener();
    $scope.togglePlay = false;
  };
  $scope.nextSong = function() {
    MusicPlayer.nextSong();
    $scope.playingTrackIndex++;
    if ($scope.playingTrackIndex >= $scope.album.songs.length) {
      $scope.playingTrackIndex = 0;
    }
    $scope.listener();
    $scope.togglePlay = false;
  };
  $scope.previousSong = function() {
    MusicPlayer.previousSong();
    $scope.playingTrackIndex--;
    if ($scope.playingTrackIndex < 0) {
      $scope.playingTrackIndex = $scope.album.songs.length - 1;
    }
    $scope.listener();
    $scope.togglePlay = false;
    if ($scope.playingTrackIndex !== null) {
      $scope.updateTime();
      $scope.updateDuration();
      $scope.updateSeekBarWhileSongPlays();
    }
  };
}]);
