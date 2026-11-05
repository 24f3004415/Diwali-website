/* ===== EDIT THIS PART ===== */
const CONFIG = { her: "My Love", me: "Yours, always", photoCount: 79, videoCount: 2 }; // photos: 01.jpeg ... 79.jpeg, videos: v1.mp4, v2.mp4 (all in /images)

// img = photo number from your images folder. Change dates, titles and text!
const memories = [
    { d: "The Beginning", t: "The Day We Met", x: "I didn't know it then, but my life was about to change forever.", img: 79 },
    { d: "Our First Date", t: "Butterflies Everywhere", x: "I was so nervous, and you made it feel like home within minutes.", img: 2 },
    { d: "First Movie Date", t: "I Watched You, Not the Movie", x: "Honestly, I can't tell you the plot. I was busy smiling at you.", img: 3 },
    { d: "First Dandiya Night", t: "Dancing Under the Stars", x: "You in your traditional outfit, laughing and twirling. Best night ever.", img: 38 },
    { d: "A Random Tuesday", t: "Ordinary Days, Extraordinary You", x: "Even our simplest moments turned into my favourite memories.", img: 11 },
    { d: "Just Us", t: "Two Months of Magic", x: "Every day with you has been the best chapter of my story.", img: 27 }
];

const letter = `To my favourite person, Shraddha ❤️

Happy Diwali, meri favourite human! 🪔❤️

Pata hai, Diwali toh har saal aati hai, ghar roshniyon se sajte hain, diye jalte hain aur har taraf khushiyan hoti hain. But this year feels a little more special because I have you in my life.

I don't know how to explain it, but tumhare aane se meri life mein bhi ek alag si roshni aa gayi hai. Tumhari smile, tumhari baatein, tumhara care karna aur tumhara mere saath hona  these little things make me genuinely happy.

Iss Diwali, Bhagwan se bas yahi wish hai ki tumhari life hamesha khushiyon, success, good health aur endless smiles se bhari rahe. Tumhare saare dreams poore hon aur tumhe kabhi kisi cheez ki kami mehsoos na ho.

And hopefully, mujhe bhi har Diwali tumhare saath celebrate karne ka mauka mile. Kabhi saath mein diye jalayein, sweets share karein, fireworks dekhein aur bahut saari beautiful memories banayein.

I may not be able to give you the whole world, but I promise to keep making efforts to give you happiness, love and countless reasons to smile.

Iss Diwali meri favourite wish koi gift ya materialistic cheez nahi hai. It's simply you, your happiness and us. ❤️

Stay happy, keep smiling and never forget how special you are to me. You are my forever light. ❤️

Happy Diwali, Shraddha!

Lots of love,
Your Mohit ❤️`;
/* ===== END EDIT ===== */

const $ = s => document.querySelector(s);
const pad = n => String(n).padStart(2, "0");
const src = n => `images/${pad(n)}.jpeg`;
$("#herName").textContent = CONFIG.her;
$("#sign").textContent = CONFIG.me;

// Timeline
$("#tl").innerHTML = memories.map(m => `<div class="item"><div class="card">
  <img src="${src(m.img)}" alt="${m.t}" loading="lazy"><div class="date">${m.d}</div><h3>${m.t}</h3><p>${m.x}</p></div></div>`).join("");

// Gallery
$("#grid").innerHTML = Array.from({ length: CONFIG.photoCount }, (_, i) => `<img src="${src(i + 1)}" alt="Memory ${i + 1}" loading="lazy">`).join("");

// Videos
$("#vids").innerHTML = Array.from({ length: CONFIG.videoCount }, (_, i) =>
    `<video controls playsinline preload="metadata" src="images/v${i + 1}.mp4"></video>`).join("");
document.querySelectorAll("#vids video").forEach(v => v.addEventListener("play", () => $("#bgm").pause()));

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll(".item,.grid img").forEach(el => io.observe(el));

// Lightbox
document.addEventListener("click", e => {
    if (e.target.matches(".card img,.grid img")) { $("#lb img").src = e.target.src; $("#lb").classList.add("on"); }
    else if (e.target.closest("#lb")) $("#lb").classList.remove("on");
});

// Typewriter letter
let typed = false;
new IntersectionObserver((es, o) => {
    if (es[0].isIntersecting && !typed) {
        typed = true; let i = 0; const el = $("#text");
        (function type() { el.textContent = letter.slice(0, ++i); if (i < letter.length) setTimeout(type, 35); })();
    }
}, { threshold: .3 }).observe($(".paper"));

// Floating diyas, petals and hearts
const icons = ["🪔", "🌸", "✨", "💖", "🪷", "🌼"];
setInterval(() => {
    const s = document.createElement("span");
    s.textContent = icons[Math.floor(Math.random() * icons.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 14 + Math.random() * 22 + "px";
    s.style.animationDuration = 8 + Math.random() * 8 + "s";
    $("#float").appendChild(s);
    setTimeout(() => s.remove(), 16000);
}, 600);

// Fireworks
const cv = $("#fx"), c = cv.getContext("2d"); let ps = [];
const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit(); addEventListener("resize", fit);
function burst(x, y) {
    const hue = Math.random() * 360;
    for (let i = 0; i < 70; i++) {
        const a = Math.random() * 6.283, v = 1 + Math.random() * 5;
        ps.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, h: hue + Math.random() * 40 });
    }
}
(function loop() {
    c.clearRect(0, 0, cv.width, cv.height);
    ps = ps.filter(p => p.l > 0);
    ps.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += .05; p.vx *= .98; p.l -= .014;
        c.fillStyle = `hsla(${p.h},100%,65%,${p.l})`;
        c.beginPath(); c.arc(p.x, p.y, 2.2, 0, 6.283); c.fill();
    });
    requestAnimationFrame(loop);
})();
const show = () => { for (let i = 0; i < 6; i++) setTimeout(() => burst(Math.random() * cv.width, Math.random() * cv.height * .6), i * 300); };
addEventListener("pointerdown", e => burst(e.clientX, e.clientY));
$("#wish").onclick = show;

// Intro + music
const bgm = $("#bgm");
$("#open").onclick = () => {
    $("#intro").classList.add("gone"); show();
    bgm.play().catch(() => { });
};
$("#mute").onclick = () => bgm.paused ? bgm.play().catch(() => { }) : bgm.pause();