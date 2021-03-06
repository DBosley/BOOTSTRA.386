window._386 = window._386 || {};
document.addEventListener("DOMContentLoaded", function () {
  'use strict';
  var character = {
    height: 20,
    width: 10
  };

  function loading() {
    if (window._386.fastLoad) {
      document.body.style.visibility = 'visible';
      return;
    }
    
    var
      onePass = window._386.onePass,
      speedFactor = 1 / (window._386.speedFactor || 1) * 165000,
      wrap = document.createElement('div'),
      bar = wrap.appendChild(document.createElement('div')),

      cursor = document.createElement('div'),
      // If the user specified that the visibility is hidden, then we
      // start at the first pass ... otherwise we just do the
      // cursor fly-by
      pass = (document.body.visibility === 'visible') ? 1 : 0,
      height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,

      // this makes the loading of the screen proportional to the real-estate of the window.
      // it helps keep the cool sequence there while not making it waste too much time.
      rounds = (height * width / speedFactor),
      column = width,
      row = height - character.height;

    wrap.id = 'wrap386';
    bar.id = 'bar386';
    cursor.id = 'cursor386';

    cursor.innerHTML = bar.innerHTML = '&#9604;';

    // only inject the wrap if the pass is 0
    if (pass === 0) {
      document.body.appendChild(wrap);
      document.body.style.visibility = 'visible';
    } else {
      document.body.appendChild(cursor);
      rounds /= 2;
      character.height *= 4;
    }

    var ival = setInterval(function () {
      for (var m = 0; m < rounds; m++) {
        column -= character.width;

        if (column <= 0) {
          column = width;
          row -= character.height;
        }
        if (row <= 0) {
          pass++;
          row = height - character.height;

          if (pass == 2) {
            document.body.removeChild(cursor);
            clearInterval(ival);
          } else {
            wrap.parentNode.removeChild(wrap);
            if (onePass) {
              clearInterval(ival);
            } else {
              document.body.appendChild(cursor);
              rounds /= 2;
              character.height *= 4;
            }
          }
        }

        if (pass === 0) {
          bar.style.width = column + 'px';
          wrap.style.height = row + 'px';
        } else {
          cursor.style.right = column + 'px';
          cursor.style.bottom = row + 'px';
        }
      }
    }, 1);
  }
  loading();
});