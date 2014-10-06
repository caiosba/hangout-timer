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
      this.timestr = '00:00';
    },
    pause: function() {
      this.running = false;
    },
    resume: function() {
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

function roundRect(ctx, x, y, width, height, radius) {
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.fill();
}

function HoverTimer(canvas, x, y) {
  var ctx = canvas.getContext('2d');
  ctx.font = 'bold 70px Arial';
  var x = x;
  var y = y;
  
  function drawTimer(stopwatch) {
    roundRect(ctx, x, y - 10 - canvas.height / 3, canvas.width / 3, canvas.height / 3, 6);
    ctx.fillStyle = '#4C7A34';
    ctx.fillText(stopwatch['1'].timestr, x + 10, y - 20);
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
