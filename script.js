/* neural animated background (subtle particle connections) */
const canvas = document.getElementById('neural-bg');
const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
let W=0, H=0, nodes=[];

function initBG(){
  if(!canvas || !ctx) return;
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  nodes = [];
  const count = Math.max(16, Math.floor(W/90));
  for(let i=0;i<count;i++){
    nodes.push({x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.6, r:1.6+Math.random()*1.6});
  }
}
function drawBG(){
  if(!ctx) return;
  ctx.clearRect(0,0,W,H);
  // lines
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const a = nodes[i], b = nodes[j];
      const dx=a.x-b.x, dy=a.y-b.y; const d=Math.hypot(dx,dy);
      if(d<140){
        ctx.strokeStyle = `rgba(180,0,255,${0.04*(1-d/140)})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }
  // dots
  nodes.forEach(n=>{
    n.x+=n.vx; n.y+=n.vy;
    if(n.x<0||n.x>W) n.vx*=-1;
    if(n.y<0||n.y>H) n.vy*=-1;
    ctx.beginPath(); ctx.fillStyle='rgba(180,0,255,0.28)'; ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(drawBG);
}
window.addEventListener('resize', ()=>{ initBG(); });
initBG(); drawBG();

/* reveal on scroll */
const revealEls = document.querySelectorAll('.fade-in');
function reveal(){
  const trigger = window.innerHeight * 0.85;
  revealEls.forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < trigger) el.classList.add('visible');
  });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

/* navbar active highlight on scroll */
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['home','about','projects','skills','contact'];
function updateNav(){
  let current = 'home';
  sections.forEach(id=>{
    const s = document.getElementById(id);
    if(!s) return;
    const top = s.getBoundingClientRect().top;
    if(top <= 120) current = id;
  });
  navLinks.forEach(a=>{
    a.classList.remove('active');
    if(a.getAttribute('href').includes(current)) a.classList.add('active');
  });
}
window.addEventListener('scroll', updateNav);
window.addEventListener('load', updateNav);

/* contact form (demo) */
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Thanks! This demo form does not send emails. Replace with your backend or form service.');
    form.reset();
  });
}
function openModal(id){
  document.getElementById(id).classList.add("show");
  document.getElementById("modal-backdrop").classList.add("show");
}

function closeModal(){
  document.querySelectorAll(".modal").forEach(m=>m.classList.remove("show"));
  document.getElementById("modal-backdrop").classList.remove("show");
}
/* mobile menu toggle */
const menuIcon = document.getElementById("menu-icon");
const mobileNav = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
});




