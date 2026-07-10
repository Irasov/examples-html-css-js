let canvas = document.getElementsByClassName('rain')[0];
let c = canvas.getContext('2d');

function randomNum(max, min) {
  return Math.floor(Math.random() * max) + min;
}

class RainDrops {
  constructor(x, y, endy, velocity, opacity) {
    this.x = x;
    this.y = y;
    this.endy = endy;
    this.velocity = velocity;
    this.opacity = opacity;
  }

  draw() {
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x, this.y - this.endy);
    c.lineWidth = 1;
    c.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
    c.stroke();
  }

  update() {
    let rainEnd = window.innerHeight + 100;
    if (this.y >= rainEnd) {
      this.y = this.endy - 100;
    } else {
      this.y = this.y + this.velocity;
    }
    this.draw();
  }
}

let rainArray = [];

function initRain() {
  rainArray = [];
  for (let i = 0; i < 140; i++) {
    let rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
    let rainYLocation = Math.random() * -500;
    let randomRainHeight = randomNum(10, 2);
    let randomSpeed = randomNum(20, 0.2);
    let randomOpacity = Math.random() * 0.85;
    rainArray.push(
      new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity),
    );
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initRain();
}

let resizeTimeout;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 200);
});

resizeCanvas();

function animateRain() {
  requestAnimationFrame(animateRain);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < rainArray.length; i++) {
    rainArray[i].update();
  }
}

animateRain();
