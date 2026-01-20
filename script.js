const card = document.querySelector(".card");
const hint = document.querySelector(".tap-hint");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let revealed = false;
let confetti = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("click", () => {
    if (revealed) return;
    revealed = true;

    card.classList.remove("hidden");
    hint.style.display = "none";

    startConfetti();
});

function startConfetti() {
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 3 + 2,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            rotation: Math.random() * 360
        });
    }

    requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(p => {
        p.y += p.speed;
        p.rotation += 2;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
    });

    requestAnimationFrame(updateConfetti);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const rgbName = document.getElementById("rgb-name");

let hue = 0;

setInterval(() => {
    hue = (hue + 2) % 360;
    rgbName.style.color = `hsl(${hue}, 80%, 55%)`;
}, 50);