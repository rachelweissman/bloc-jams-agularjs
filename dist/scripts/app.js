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
blocJamsModule.controller("AlbumController", ["$scope", "$rootScope", "$stateParams", "MusicPlayer", function($scope, $rootScope, $stateParams, MusicPlayer) {
	$scope.album = albumPicasso;
  MusicPlayer.setCurrentAlbum(albumPicasso);

  $rootScope.bodyClass = "album";
	$scope.playingTrackIndex = null;
	$scope.togglePlay = true;
  // $scope.playingTrackIndex = MusicPlayer.currentSongIndex();
  // $scope.togglePlay = $scope.playingTrackIndex === null || MusicPlayer.isPaused();
  $scope.volume = 80;

  $scope.$watch('volume', function(){
      MusicPlayer.setVolume($scope.volume);
    });
    $scope.$watch('trackProgress', function(){
      if($scope.trackProgress === undefined) {
        return;
      }
      if (Math.abs(MusicPlayer.getTime() / MusicPlayer.getDuration() * 100 - $scope.trackProgress) > 1){
        MusicPlayer.setTime($scope.trackProgress / 100 * MusicPlayer.getDuration());
      }
    });

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
	$scope.setVolume = function() {
		MusicPlayer.setVolume(volume);
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
  };
	if ($scope.playingTrackIndex !== null) {
		$scope.updateTime();
		$scope.updateDuration();
		$scope.updateSeekBarWhileSongPlays();
	}
}]);

//songPlayer
blocJamsModule.factory("MusicPlayer", function() {
  var currentAlbum = null;
  var currentlyPlayingSongNumber = null;
  var currentSongFromAlbum = null;
  var currentSoundFile = null;
  var currentVolume = 80;

  var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
  };

  return {
    setCurrentAlbum: function(album) {
      currentAlbum = album;
      for (i = 0; i < album.songs.length; i++) {
        var sound = new buzz.sound(album.songs[i].audioUrl, {
          formats: ['mp3'],
          preload: 'metadata'
        });
        var mySound = function(i, sound) {
          return function() {
            var length = sound.getDuration();
          }
        };
        sound.bind("loadedmetadata", mySound(i, sound));
      }
    },
    setSong: function(songNumber) {
      if (currentSoundFile) {
        currentSoundFile.stop();
        currentSoundFile.unbind("timeupdate");
      }
      currentlyPlayingSongNumber = songNumber;
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      this.setVolume(currentVolume);
    },
    setVolume: function(volume) {
      currentVolume = volume;
      if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
      }
    },
    setTime: function(seconds) {
            if (currentSoundFile) {
                currentSoundFile.setTime(seconds);
            }
        },
    togglePlayFromPlayerBar: function() {
      if (currentlyPlayingSongNumber === null) {
        return this.nextSong();
        return false;
      }
      if (currentSoundFile.isPaused()) {
        currentSoundFile.play();
        return false;
      } else if (currentSoundFile) {
        currentSoundFile.pause();
        return true;
      }
    },
    isPaused: function() {
      return currentSoundFile.isPaused();
    },
		// ended: function() {
		// 	return currentSoundFile.isEnded();
		// },
    getTime: function() {
      return currentSoundFile.getTime();
    },
    registerProgressListener: function(listener) {
      if (currentSoundFile === null) {
        return;
      }
      currentSoundFile.bind("timeupdate", listener);
    },
    getDuration: function() {
      return currentSoundFile.getDuration();
    },
    pause: function() {
      currentSoundFile.pause();
    },
    play: function() {
      currentSoundFile.play();
    },
    currentSongIndex: function() {
      if (currentSoundFile) {
        return trackIndex(currentAlbum, currentSongFromAlbum);
      }
      return null;
    },
    nextSong: function() {
      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      currentSongIndex++;
      if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
      }
      this.setSong(currentSongIndex + 1);
      currentSoundFile.play();
    },
    previousSong: function() {
      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      currentSongIndex--;
      if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
      }
      this.setSong(currentSongIndex + 1);
      currentSoundFile.play();
    }
  };
});

blocJamsModule.directive("testDirective", [
  function() {
    return {
      template: "<h1>TEST</h1>",
      restrict: "E",
    };
  }
]);


//slider
blocJamsModule.directive("mySlider", ["MusicPlayer", "$document", function(MusicPlayer, $document) {
  console.log("mySlider");
  return {
    templateUrl: '/templates/slider.html',
    restrict: 'E',
    replace: true,
    scope: {
			value: "="
		},
    controller: function() {
			// alert("asdfasdf");
    },
    link: function(scope, element, attributes) {
            scope.fill = {width: (scope.value || 0) + '%'};
            scope.thumb = {left: scope.fill.width};

            scope.$watch('value', function(){
               scope.fill = {width: (scope.value || 0) + '%'};
               scope.thumb = {left: scope.fill.width};
            });
            scope.setBarLimits = function() {
                if (scope.value <= 0) {
                      scope.value = 0;
                }
                else if (scope.value >=100) {
                      scope.value = 100;
                }
            };
            // scope.setVolume = function() {
            //   MusicPlayer.setVolume(volume);
            // };
            element.on('mousedown', function(event) {
                // if(scope.value === undefined) {
                //   return;
                // }
                var offsetX = event.pageX - (element[0].getBoundingClientRect().left + document.body.scrollLeft);
                var barWidth = element[0].offsetWidth;
                var seekBarFillRatio = offsetX / barWidth;

                scope.value = seekBarFillRatio * 100;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
                scope.setBarLimits();
            });
            function mousemove(event) {
                var offsetX = event.pageX - (element[0].getBoundingClientRect().left + document.body.scrollLeft);
                var barWidth = element[0].offsetWidth;
                var seekBarFillRatio = offsetX / barWidth;
                scope.value = seekBarFillRatio * 100;
                scope.setBarLimits();
                scope.$apply()
            };
            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            };
         }

  };
}]);




//filter
blocJamsModule.filter('filterTime', function() {

  return function(timeInSeconds) {
    var time = parseFloat(timeInSeconds);
    var wholeMinutes = Math.floor(time / 60);
    var wholeSeconds = Math.floor(time - wholeMinutes * 60);
    if (wholeSeconds >= 10) {
      var formatTime = wholeMinutes + ":" + wholeSeconds;
    } else {
      var formatTime = wholeMinutes + ":0" + wholeSeconds;
    }
    return formatTime;
  };
});
