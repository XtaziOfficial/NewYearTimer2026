// --- Theme toggle logic ---

let darkTheme = false;
const themeBtn = document.getElementById('toggle-theme');

function setTheme(dark) {
  const body = document.body;
  const timeBlock = document.querySelector('.time-block');
  const html = document.documentElement;
  if (dark) {
    body.style.backgroundImage = "url('BGn.svg'), linear-gradient(135deg, #001f3f, #011627)";
    if (timeBlock) timeBlock.style.borderImageSource = "url('Bordern.svg')";
    html.classList.add('dark-theme');
    document.documentElement.style.setProperty('--timer-bg', '#07003C');
    document.documentElement.style.setProperty('--timer-text', '#D1B500');
    themeBtn.textContent = 'Тема: ТЁМНАЯ';
  } else {
    body.style.backgroundImage = "url('BG.svg'), linear-gradient(135deg, #001f3f, #011627)";
    if (timeBlock) timeBlock.style.borderImageSource = "url('Border.svg')";
    html.classList.remove('dark-theme');
    document.documentElement.style.setProperty('--timer-bg', '#FFECC8');
    document.documentElement.style.setProperty('--timer-text', '#DA5252');
    themeBtn.textContent = 'Тема: СВЕТЛАЯ';
  }
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    darkTheme = !darkTheme;
    setTheme(darkTheme);
  });
}

setTheme(false);
// Анимированный снег для NewYearTimer

let canvas = document.getElementById('snow-canvas');
let ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let snowflakes = [];
let SNOWFLAKE_COUNT = Math.floor(width / 18); // меньше снежинок

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createSnowflake() {
  return {
    x: randomBetween(0, width),
    y: randomBetween(-height, 0),
    r: randomBetween(1.5, 4),
    speed: randomBetween(0.7, 2.5),
    wind: randomBetween(-0.5, 0.5),
    opacity: randomBetween(0.6, 1)
  };
}

function initSnowflakes() {
  snowflakes = [];
  SNOWFLAKE_COUNT = Math.floor(window.innerWidth / 18);
  for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
    snowflakes.push(createSnowflake());
  }
}
initSnowflakes();

function drawSnowflakes() {
  ctx.shadowBlur = 3; // blur меньше
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const flake of snowflakes) {
    ctx.globalAlpha = flake.opacity;
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 3;
    ctx.fill();
  }
  ctx.restore();
}

function updateSnowflakes() {
  for (const flake of snowflakes) {
    flake.y += flake.speed;
    flake.x += flake.wind;
    if (flake.y > height + flake.r) {
      flake.x = randomBetween(0, width);
      flake.y = randomBetween(-20, -flake.r);
      flake.r = randomBetween(1.5, 4);
      flake.speed = randomBetween(0.7, 2.5);
      flake.wind = randomBetween(-0.5, 0.5);
      flake.opacity = randomBetween(0.6, 1);
    }
    if (flake.x < -flake.r) flake.x = width + flake.r;
    if (flake.x > width + flake.r) flake.x = -flake.r;
  }
}

function animateSnow() {
  drawSnowflakes();
  updateSnowflakes();
  requestAnimationFrame(animateSnow);
}


function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initSnowflakes();
}
window.addEventListener('resize', onResize);



let snowEnabled = true;
let snowFrameId = null;
let lastFrame = 0;
const SNOW_FPS = 30; // ограничить FPS

function loopSnow() {
  if (!snowEnabled) return;
  drawSnowflakes();
  updateSnowflakes();
  snowFrameId = requestAnimationFrame(loopSnow);
}

function startSnow() {
  if (!snowEnabled) return;
  if (!snowFrameId) {
    snowFrameId = requestAnimationFrame(loopSnow);
  }
}


function stopSnow() {
  if (snowFrameId) {
    cancelAnimationFrame(snowFrameId);
    snowFrameId = null;
  }
  if (ctx && canvas) ctx.clearRect(0, 0, width, height);
  // Не очищаем snowflakes и не удаляем resize, чтобы можно было возобновить снег корректно
}


const snowBtn = document.getElementById('toggle-snow');

if (snowBtn) {
  snowBtn.addEventListener('click', () => {
    snowEnabled = !snowEnabled;
    if (snowEnabled) {
      canvas.style.display = '';
      ctx = canvas.getContext('2d');
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initSnowflakes();
      window.addEventListener('resize', onResize);
      snowBtn.textContent = 'Снег: ВКЛ';
      lastFrame = 0;
      startSnow();
    } else {
      canvas.style.display = 'none';
      snowBtn.textContent = 'Снег: ВЫКЛ';
      stopSnow();
    }
  });
}

if (snowEnabled) {
  startSnow();
}
