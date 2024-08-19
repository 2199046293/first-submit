const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const screenWidth = canvas.width;
const screenHeight = canvas.height;

const balloonRadius = 50;
let balloonX = screenWidth / 2;
let balloonY = screenHeight / 2;

let exploded = false;
let explosionParticles = [];
const explosionSpeed = 5;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * explosionSpeed * 2 - explosionSpeed;
        this.vy = Math.random() * explosionSpeed * 2 - explosionSpeed;
        this.size = Math.random() * 3 + 2;
        this.color = `rgb(${Math.random() * 55 + 200}, ${Math.random() * 50}, 0)`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function createExplosion() {
    for (let i = 0; i < 100; i++) {
        explosionParticles.push(new Particle(balloonX, balloonY));
    }
}

function drawBalloon() {
    ctx.beginPath();
    ctx.arc(balloonX, balloonY, balloonRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function update() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    if (!exploded) {
        drawBalloon();
    } else {
        explosionParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    }

    requestAnimationFrame(update);
}

canvas.addEventListener('click', (event) => {
    if (!exploded) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (Math.sqrt((mouseX - balloonX) ** 2 + (mouseY - balloonY) ** 2) <= balloonRadius) {
            exploded = true;
            createExplosion();
        }
    }
});

update();
