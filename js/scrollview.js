/*jslint indent: 2, browser: true */
/*global alert: false */

(function ($) {

  'use strict';

  $(document).ready(function () {

    function setupScrollView(scrollview) {

      var
        startY = 0,
        bounce = 0.1,
        bounceRange = 150,
        deceleration = 0.93,
        frameDuration = 15,
        minScrollY = 0,
        maxScrollY = Math.max(0, scrollview.scrollHeight - scrollview.offsetHeight);

      function swipeFrame(velocity, position) {

        var
          newVelocity = velocity * deceleration,
          newPosition = position + (frameDuration * newVelocity),
          withInMinRange = (
            (newPosition < minScrollY) && (newPosition > (minScrollY - bounceRange))
          ),
          withInMaxRange = (
            (newPosition > maxScrollY) && (newPosition > (maxScrollY + bounceRange))
          ),
          tooSlow;

        //console.log('swipeFrame');

        if (withInMinRange || withInMaxRange) {
          newVelocity *= bounce;
        }

        tooSlow = (Math.abs(newVelocity).toFixed(4) < 0.015);

        if (!tooSlow) {

          setTimeout(function () {
            swipeFrame(newVelocity, newPosition);
          }, frameDuration);
          scrollview.scrollTop = newPosition;
        }
      }

      $(scrollview).hammer().on('dragstart', function (event) {

        //console.log('dragstart');
        startY = scrollview.scrollTop;
      });

      $(scrollview).hammer().on('drag', function (event) {

        //console.log('drag');
        scrollview.scrollTop = startY - event.gesture.deltaY;
      });

      $(scrollview).hammer().on('dragend', function (event) {

        //console.log('dragend');
      });

      $(scrollview).hammer().on('swipe', function (event) {

        //console.log('swipe');

        if (event.gesture.direction !== 'up' &&
            event.gesture.direction !== 'down') {

          return;
        }

        swipeFrame(
          event.gesture.velocityY * (event.gesture.direction === 'up' ? 1.0 : -1.0),
          scrollview.scrollTop
        );
      });
    }

    var i, scrollviews = $('.sdk-scrollview');
    for (i = scrollviews.length - 1; i >= 0; i -= 1) {

      setupScrollView(scrollviews[i]);
    }
  });

}(jQuery));

