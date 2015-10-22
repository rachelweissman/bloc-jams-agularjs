//slider
var sliderModule = angular.module('blocJamsModule');

sliderModule.directive('slider', function(MusicPlayer, $document) {

    return {
      templateUrl: 'templates/slider.html',
      restrict: 'E',
      replace: true,
      scope: {
        value: '='
      },

      link: function(scope, element, attributes) {
        scope.fillStyles = {
          width: (scope.value || 0) + '%'
        };
        scope.thumbStyles = {
          left: scope.fillStyles.width
        };

        scope.$watch('value', function() {
          scope.fillStyles = {
            width: (scope.value || 0) + '%'
          };
          scope.thumbStyles = {
            left: scope.fillStyles.width
          };
        });

        element.on('mousedown', function(event) {
          if (scope.value === undefined) {
            return;
          }
          var offsetX = event.pageX - (element[0].getBoundingClientRect().left + document.body.scrollLeft);
          var barWidth = element[0].offsetWidth;
          var seekBarFillRatio = offsetX / barWidth;
          scope.fillStyles = {
            width: 100 * seekBarFillRatio + '%'
          };
          scope.thumbStyles = {
            left: scope.fillStyles.width
          };
          scope.value = seekBarFillRatio * 100;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
          if (scope.value <= 0) {
            scope.fillStyles = {
              width: 0
            };
            scope.thumbStyles = {
              left: 0
            };
            scope.value = 0;
          } else if (scope.value >= 100) {
            scope.fillStyles = {
              width: 100 + '%'
            };
            scope.thumbStyles = {
              left: scope.fillStyles.width
            };
            scope.value = 100;
          }
        });

        function mousemove(event) {
          var offsetX = event.pageX - (element[0].getBoundingClientRect().left + document.body.scrollLeft);
          var barWidth = element[0].offsetWidth;
          var seekBarFillRatio = offsetX / barWidth;
          scope.fillStyles = {
            width: 100 * seekBarFillRatio + '%'
          };
          scope.thumbStyles = {
            left: scope.fillStyles.width
          };
          scope.value = seekBarFillRatio * 100;
          if (scope.value <= 0) {
            scope.fillStyles = {
              width: 0
            };
            scope.thumbStyles = {
              left: 0
            };
            scope.value = 0;
          } else if (scope.value >= 100) {
            scope.fillStyles = {
              width: 100 + '%'
            };
            scope.thumbStyles = {
              left: scope.fillStyles.width
            };
            scope.value = 100;
          }
          scope.$apply()
        };

        function mouseup() {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        };
      }
    };
});
