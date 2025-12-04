// Navbar color change عند Scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0,0,0,0.9)";
  } else {
    navbar.style.background = "rgba(0,0,0,0.7)";
  }
});
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Scroll animations لكل Sections
const sections = document.querySelectorAll(".section:not(.hidden)");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);
sections.forEach((section) => {
  observer.observe(section);
});

// Animated Background (Particles تفاعلي مع الماوس)
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const colors = ["#1e90ff", "#ff6600", "#00ffff", "#ff00ff"];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
function init() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
init();
animate();
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

// About Section Toggle
const aboutLink = document.querySelector('a[href="#about"]');
const aboutSection = document.getElementById("about");
aboutLink.addEventListener("click", function (e) {
  e.preventDefault();
  if (aboutSection.classList.contains("show-about")) {
    aboutSection.classList.remove("show-about");
  } else {
    aboutSection.classList.add("show-about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
});

// About Tabs
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");
tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const target = tab.getAttribute("data-tab");
    contents.forEach((c) => c.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// Projects Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeBtn = document.querySelector(".close-btn");
const projectCards = document.querySelectorAll(".card");

const projectData = {
  project1: {
    title: "Student Management System (C++)",
    desc: "Complete student data management system using Linked List, Stack, Queue, BST.",
  },
  project2: {
    title: "OpenGL Tank Animation",
    desc: "3D animated scene with tank, trees, clouds using OpenGL.",
  },
  project3: {
    title: "Python GUI – Data Structures Visualizer",
    desc: "Tkinter GUI visualizing Linked List, Stack, and Queue operations.",
  },
};

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-project");
    modalTitle.textContent = projectData[id].title;
    modalDesc.textContent = projectData[id].desc;
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
