function HangoutOverlay() {
  gapi.hangout.av.setLocalParticipantVideoMirrored(false);
  var prevImgRsc = null;
  function refreshFromUrl(dataUrl) {
    var imgRsc = gapi.hangout.av.effects.createImageResource(dataUrl);
    imgRsc.showOverlay();
    if (prevImgRsc)
      prevImgRsc.dispose();
    prevImgRsc = imgRsc;
  };
  return {
    setUrl: refreshFromUrl
  };
};

include('//ca.ios.ba/files/the-jibe/timer/src/StopWatch.js?_t=' + Date.now(), function() {
  var stopwatch  = new StopWatch(),
      canvas     = document.getElementById('img'),
      overlay    = new HangoutOverlay(),
      hovertimer = new HoverTimer(canvas, 10, canvas.height - 10);

  // Duration must be in seconds
  var timer = function(duration) {
    if (duration) {
      stopwatch.reset(duration);
      hovertimer.clear();

      // Each second
      stopwatch.handler = function() {
        // Update timer here
        var minutes = parseInt((stopwatch.duration - stopwatch.elapsed) / 60, 10);
        var seconds = parseInt((stopwatch.duration - stopwatch.elapsed) % 60, 10);
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        var timestr = minutes + ':' + seconds;
        document.getElementById('timer-1').value = timestr;

        var dataurl = hovertimer.drawToDataUrl(timestr);
        overlay.setUrl(dataurl);

        if (timestr == '00:00') {
          timer();
        }
      };
      
      stopwatch.start();
    }
    else {
      stop();
      overlay.setUrl(hovertimer.drawToDataUrl('00:00'));
    }
  };

  var start = function() {
    var value = document.getElementById('timer-1').value;
    if (value != '00:00') {
      stopwatch.last = value;
      var minutes_and_seconds = stopwatch.last.split(':');
      var time = parseInt(minutes_and_seconds[0], 10) * 60 + parseInt(minutes_and_seconds[1], 10);
      timer(time);
      resume();
    }
  };

  var pause = function() {
    var button = document.getElementById('start');
    button.onclick = resume;
    button.innerHTML = 'Resume';
    stopwatch.pause();
  };

  var resume = function() {
    var button = document.getElementById('start');
    button.onclick = pause;
    button.innerHTML = 'Pause';
    stopwatch.resume();
  };

  var stop = function() {
    var button = document.getElementById('start');
    button.onclick = start;
    button.innerHTML = 'Start';
    stopwatch.stop();
  };

  var validate = function() {
    var start   = document.getElementById('start'),
        message = document.getElementById('message');
    if (/^[0-9]{2}:[0-9]{2}$/.test(document.getElementById('timer-1').value)) {
      start.disabled = false;
      message.innerHTML = '';
    }
    else {
      start.disabled = true;
      message.innerHTML = 'Time format must be mm:ss';
    }
  };

  document.getElementById('start').onclick = start;

  document.getElementById('timer-1').onkeyup = validate;

  document.getElementById('reset').onclick = function() {
    if (stopwatch.last) {
      document.getElementById('timer-1').value = stopwatch.last;
      var dataurl = hovertimer.drawToDataUrl(stopwatch.last);
      overlay.setUrl(dataurl);
      stop();
    }
  };

  var types = {
    highschool: [8, 5, 3],
    college: [9, 6, 3],
    british: [7]
  };

  var minutesToString = function(minutes) {
    if (minutes < 10) minutes = '0' + minutes;
    return minutes + ':00';
  };
  
  var select = function(type) {
    var container = document.getElementById('debate-time-options'),
        timer     = document.getElementById('timer-1');
    
    container.innerHTML = '';

    for (var i = 0; i < types[type].length; i++) {
      var value = types[type][i],
          a     = document.createElement('A');
      a.setAttribute('href', '#');
      a.setAttribute('data-value', value);
      a.setAttribute('class', 'debate-time-option');
      if (minutesToString(value) == timer.value) a.setAttribute('id', 'debate-time-selected');
      var t = document.createTextNode(value + ' min');
      a.appendChild(t);
      container.appendChild(a);
      a.onclick = function() {
        stop();
        timer.value = minutesToString(this.getAttribute('data-value'));
        if (document.getElementById('debate-time-selected')) document.getElementById('debate-time-selected').removeAttribute('id');
        this.setAttribute('id', 'debate-time-selected');
        validate();
      };
    }
  };

  document.getElementById('debate-type').onchange = function() {
    select(this.value);
  };
  
  select('highschool');

  document.getElementById('hide-prep').onclick = function() {
    var prep = document.getElementById('prep-timer');
    if (this.innerHTML == 'Hide') {
      prep.style.display = 'none';
      this.innerHTML = 'Show';
    }
    else if (this.innerHTML == 'Show') {
      prep.style.display = 'block';
      this.innerHTML = 'Hide';
    }
  };
});
