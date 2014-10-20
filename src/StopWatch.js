function StopWatch(id) {
  return {
    id: id,
    elapsed: 0, // In seconds
    duration: 30, // In seconds
    interval: null,
    handler: null,
    last: null,
    running: false,
    timestr: '00:00',
    stop: function() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.running = false;
      this.elapsed = 0;
    },
    pause: function() {
      this.running = false;
      this.duration = this.duration - this.elapsed;
      this.elapsed = 0;
    },
    resume: function(time) {
      if (time) {
        this.duration = time;
      }
      this.running = true;
    },
    start: function() {
      var that = this;
      this.stop();
      this.running = true;
      this.interval = setInterval(function() {
        if (that.running) that.elapsed++;
        if (that.handler) that.handler(that);
        if (that.elapsed >= that.duration) that.stop();
      }, 1000);
    },
    reset: function(duration) {
      this.stop();
      this.duration = duration;
      return this;
    }
  };
}

function roundRect(ctx, x, y, width, height, r1, r2, r3, r4, stroke, fill) {
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + r1, y);
  
  ctx.lineTo(x + width - r1, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r1);

  ctx.lineTo(x + width, y + height - r2);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r2, y + height);

  ctx.lineTo(x + r3, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r3);

  ctx.lineTo(x, y + r4);
  ctx.quadraticCurveTo(x, y, x + r4, y);

  ctx.closePath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = stroke;
  ctx.stroke();
  ctx.fillStyle = fill;
  ctx.fill();
}

function HoverTimer(canvas, x, y) {
  var ctx = canvas.getContext('2d');
  var x = x;
  var y = y;

  function colorForTimer(stopwatch) {
    if (stopwatch.running) return '#4C7A34';
    if (stopwatch.elapsed > 0 || stopwatch.timestr == '00:00') return '#D6D6D6';
    if (stopwatch.elapsed == 0) return '#000000';
  }
  
  function drawTimer(stopwatch) {
    ctx.lineWidth = 1;

    // Main timer
    ctx.font = '54px Arial';
    ctx.fillStyle = colorForTimer(stopwatch['1']);
    ctx.strokeStyle = colorForTimer(stopwatch['1']);
    // ctx.strokeText(stopwatch['1'].timestr, x + 40, y - 65);
    ctx.fillText(stopwatch['1'].timestr, x + 40, y - 65);

    // "Team A" and "Team B" timers
    ctx.font = '16px Arial';
    
    ctx.fillStyle = colorForTimer(stopwatch['a']);
    ctx.strokeStyle = colorForTimer(stopwatch['a']);
    // ctx.strokeText(stopwatch['a'].timestr, x + 243, y - 83);
    ctx.fillText(stopwatch['a'].timestr, x + 243, y - 83);
    
    ctx.fillStyle = colorForTimer(stopwatch['b']);
    ctx.strokeStyle = colorForTimer(stopwatch['b']);
    // ctx.strokeText(stopwatch['b'].timestr, x + 243, y - 48);
    ctx.fillText(stopwatch['b'].timestr, x + 243, y - 48);
  }

  return {
    clear: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    drawToDataUrl: function(stopwatch) {
      this.clear();
      drawTimer(stopwatch);
      return canvas.toDataURL();
    }
  };
};
