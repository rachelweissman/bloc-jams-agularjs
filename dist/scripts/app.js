var blocJamsModule = angular.module('blocJamsModule', ['ui.router']);


blocJamsModule.constant("CONFIG", {
  ALBUM_COLLECTION: [
    albumPicasso,
    albumPicassoOne,
    albumPicassoTwo,
  ]
});

//stateProvider & locationProvider
blocJamsModule.config(function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider.state('landing', {
        url: '/',
        controller: 'LandingController',
        templateUrl: '/templates/landing.html'
    })
    .state('collection', {
        url: '/collection',
        controller: 'CollectionController',
        templateUrl: '/templates/collection.html'
    })
    .state('album', {
      url: '/album/{id:int}',
      controller: 'AlbumController',
      templateUrl: '/templates/album.html',
      params: {
        id: 1,
      }
      });
});

//Landing Controller
blocJamsModule.controller("LandingController", [
  "$scope",
  "$rootScope",
  function($scope, $rootScope) {
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

//Collection Controller
blocJamsModule.controller("CollectionController", [
  "$scope",
  "$rootScope",
  "CONFIG",
  "$state",
  function($scope, $rootScope, CONFIG, $state) {
    $scope.albums = CONFIG.ALBUM_COLLECTION;
  }
]);

//Album Controller
blocJamsModule.controller('AlbumController', [
  '$scope',
  'MusicPlayer',
  '$timeout',
  'formatTimeFilter',
  'CONFIG',
  '$stateParams',
  '$state',
  function($scope, MusicPlayer, $timeout, formatTimeFilter, CONFIG, $stateParams, $state) {
    $scope.album = CONFIG.ALBUM_COLLECTION[$stateParams.id];
    match = $scope.album;

    var nextAlbum = 0;

    $scope.switchAlbum = function() {
        var albums = CONFIG.ALBUM_COLLECTION;
        var currentAlbum = $stateParams.id;
        var nextAlbumIndex = currentAlbum++;
        if (nextAlbum >= albums.length) {
            nextAlbum = 0;
        }
        nextAlbum++;

        $state.go("album", {id: nextAlbum});

    };

    $scope.$on('newVolume', function(event, data) {
        MusicPlayer.setVolume(data);
    });
    $scope.updatePlayer = function() {
        $scope.isPlaying = MusicPlayer.playing;
        $scope.index = MusicPlayer.currentIndex;
        $scope.songName = MusicPlayer.currentSong.name;
        $scope.artist = MusicPlayer.currentAlbum.artist;
        $timeout(function() { $scope.setDuration(); }, 100);
        $scope.vol = MusicPlayer.volume;
    };
    $scope.playSong = function(index) {
            MusicPlayer.setSong(match, match.songs[index]);
            MusicPlayer.play();
            $scope.updatePlayer();
            $scope.isPlaying = MusicPlayer.playing;
            $scope.index = MusicPlayer.currentIndex;

        $scope.$on('song:timeupdate', function(event, data) {
            $timeout(function() {
                $scope.currentTimeSecs = data;
                $scope.currentTime = formatTimeFilter(data);
            }, 0);
            $scope.prog = ($scope.currentTimeSecs / $scope.totalTimeSecs) * 100;
        });
    };
    $scope.pauseSong = function() {
        MusicPlayer.pause();
        $scope.isPlaying = MusicPlayer.playing;
    };
    $scope.$on('seek', function(event, data) {
        MusicPlayer.seek(data);
    });
    $scope.setDuration = function() {
        $scope.totalTimeSecs = MusicPlayer.duration();
        $scope.totalTime = formatTimeFilter($scope.totalTimeSecs);
    };
    if (!$scope.isPlaying) {
        $scope.currentTime = '-:--';
        $scope.totalTime = '-:--';
    };
    $scope.next = function() {
        MusicPlayer.next($scope.index);
        $scope.updatePlayer();
    };
    $scope.previous = function() {
        MusicPlayer.previous($scope.index);
        $scope.updatePlayer();
    };
    var hovered = null;
    $scope.hover = function(index) {
        hovered = index;
    };
    $scope.offHover = function(index) {
        hovered = null;
    };
    $scope.songState = function(index) {
        if ((MusicPlayer.currentIndex == index) && MusicPlayer.playing) {
            return 'playing';
        } else if (index == hovered) {
            return 'hovered';
        }
        return 'default';
    };
}]);


//MusicPlayer
blocJamsModule.factory('MusicPlayer', [
  '$rootScope',
  function($rootScope) {

    var currentSoundFile = null;
    var getIndex = function(album, song) {
        return album.songs.indexOf(song);
    };

    var playing;
    function setPlaying(value) {
      playing = value;
    }

    var volume;
    function setVolume(value){
      volume = value;
    }

    // var currentSong;
    // function setCurrentSong(song){
    //   currentSong = song;
    // }
    //
    // var currentIndex;
    // function setCurrentIndex(getIndex){
    //   currentIndex = getIndex;
    // }

    return {
        playing: false,
        currentAlbum: null,
        currentSong: null,
        // currentIndex: null,
        currentIndex: function() {
            return currentIndex;
        },
        volume: 80,
        play: function() {
            // setPlaying(true);
            this.playing = true;

            if (currentSoundFile) {
                currentSoundFile.bind('timeupdate', function(event) {
                    $rootScope.$broadcast('song:timeupdate', currentSoundFile.getTime());
                });
            }
            currentSoundFile.play();
        },
        pause: function() {
            this.playing = false;
            currentSoundFile.pause();
        },
        // set volume via buzz method
        setVolume: function(value) {
            if (currentSoundFile) {
                currentSoundFile.setVolume(value);
            }
        },
        setSong: function(album, song) {
            if (playing && currentSoundFile) {
              currentSoundFile.stop();
            }
            this.currentAlbum = album;
            // currentAlbum = album;
            this.currentSong = song;
            // setCurrentSong();
            this.currentIndex = getIndex(this.currentAlbum, this.currentSong);
            // currentIndex = getIndex(currentAlbum, setCurrentSong);
            var audioUrlParts = song.audioUrl.split(".");
            var audioUrlPartsBasename = audioUrlParts[0];
            var audioUrlPartsTwo = audioUrlParts[1];
            currentSoundFile = new buzz.sound(audioUrlPartsBasename, {
                formats: [audioUrlPartsTwo],
                preload: true
            });
            currentSoundFile.play();
        },
        // go to previous song or go back to end of album if on first song
        previous: function(index) {
            index--;
            if (index < 0) {
                index = this.currentAlbum.songs.length - 1;
            }
            var song = this.currentAlbum.songs[index];
            this.setSong(this.currentAlbum, song);
            currentSoundFile.play();
        },
        // go to next song or go back to beginning of album if on last song
        next: function(index) {
            index++;
            if (index >= this.currentAlbum.songs.length) {
                index = 0;
            }
            var song = this.currentAlbum.songs[index];
            this.setSong(this.currentAlbum, song);
            currentSoundFile.play();
        },
        seek: function(percent) {
            if (currentSoundFile) {
                var ratio = percent / 100;
                var newTime = currentSoundFile.getDuration() * ratio;
                currentSoundFile.setTime(newTime);
            }
        },
        duration: function() {
            if (currentSoundFile) {
                return currentSoundFile.getDuration();
            }
        }
    };
}]);

blocJamsModule.directive('slider', [
  '$document',
  '$timeout',
  function($document, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            vol: '=',
            prog: '='
        },
        templateUrl: '/templates/slider.html',
        link: function(scope, element, attrs) {
            // initial value of slider
            scope.value = 0;
            // set new value for thumb
            scope.setThumb = function(value) {
                $(element).find('.thumb').css({left: parseInt(value) + '%'});
            };
            // set new value for fill
            scope.setFill = function(value) {
                $(element).find('.fill').css({width: parseInt(value) + '%'});
            };
            // set new value
            scope.setValue = function(newVal) {
                scope.$apply(scope.value = parseInt(newVal));
                // send up the new volume value
                if ($(element).hasClass('volume')) {
                    scope.$emit('newVolume', scope.value);
                }
                if ($(element).hasClass('seeker')) {
                    scope.$emit('seek', scope.value);
                }
            };
            // update seekbar to value between 1-100
            scope.setSeek = function($slider, ratio) {
              console.log('setSeek');
                var offsetPercent = ratio * 100;
                offsetPercent = Math.max(0, offsetPercent);
                offsetPercent = Math.min(100, offsetPercent);
                scope.setThumb(offsetPercent);
                scope.setFill(offsetPercent);
                scope.setValue(offsetPercent);
            };
            // seek to clicked area
            $(element).on('click', function(event) {
                var offset = event.pageX - $(element).offset().left;
                var barWidth = $(element).width();
                var ratio = offset / barWidth;
                scope.setSeek($(element), ratio);
            });
            // drag thumb
            scope.seek = function(event) {
                $(document).bind('mousemove.thumb', function(event) {
                    var offset = event.pageX - $(element).offset().left;
                    var barWidth = $(element).width();
                    var ratio = offset / barWidth;
                    scope.setSeek($(element), ratio);
                });
                $(document).bind('mouseup.thumb', function() {
                    $(document).unbind('mousemove.thumb');
                    $(document).unbind('mouseup.thumb');
                });
            };
            scope.$watch('vol', function($slider) {
                if ($(element).hasClass('volume')) {
                    scope.setThumb(scope.vol);
                    scope.setFill(scope.vol);
                }
            });
            scope.$watch('prog', function($slider) {
                if ($(element).hasClass('seeker')) {
                    scope.setThumb(scope.prog);
                    scope.setFill(scope.prog);
                }
            });
        }
    };
}]);

blocJamsModule.filter('formatTime', function() {
  return function(seconds) {
    var time = parseFloat(seconds);
    if (isNaN(time)) {
      return '0:00'
    }
    var secFloat = parseFloat(seconds);
    var rounded = Math.floor(secFloat);
    var mins = Math.floor(rounded / 60);
    var remaining = rounded % 60;
    if (remaining < 10) {
      return mins + ':0' + remaining;
    } else {
      return mins + ':' + remaining;
    }
  };
});
