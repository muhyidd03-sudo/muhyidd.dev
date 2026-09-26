const body=document.body;
const navWrap=document.querySelector('.nav-wrap');
const menuBtn=document.querySelector('.menu-btn');
const navMenu=document.querySelector('.nav-menu');
const themeBtn=document.querySelector('.theme-btn');
const navItems=[...document.querySelectorAll('.nav-item')];

window.addEventListener('scroll',()=>navWrap.classList.toggle('scrolled',scrollY>30));

menuBtn?.addEventListener('click',()=>{
  const open=menuBtn.getAttribute('aria-expanded')==='true';
  menuBtn.setAttribute('aria-expanded',String(!open));
  menuBtn.setAttribute('aria-label',open?'Buka menu':'Tutup menu');
  navMenu.classList.toggle('open',!open);
  if(!open) navMenu.querySelector('.nav-item')?.focus();
});
navItems.forEach(a=>a.addEventListener('click',()=>{
  menuBtn?.setAttribute('aria-expanded','false');
  navMenu?.classList.remove('open');
}));

const savedTheme=localStorage.getItem('muhyiddin-theme');
if(savedTheme==='dark') body.classList.add('dark-mode');
themeBtn?.addEventListener('click',()=>{
  body.classList.toggle('dark-mode');
  localStorage.setItem('muhyiddin-theme',body.classList.contains('dark-mode')?'dark':'light');
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
    navItems.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
  }
}),{rootMargin:'-40% 0px -50% 0px',threshold:0});
sections.forEach(s=>sectionObserver.observe(s));

const finePointer=matchMedia('(pointer:fine)').matches;
if(finePointer){
  const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
  if(dot&&ring){dot.style.display='block';ring.style.display='block';
    let mx=0,my=0,rx=0,ry=0;
    addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx-3}px,${my-3}px)`});
    const tick=()=>{rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform=`translate(${rx-17.5}px,${ry-17.5}px)`;requestAnimationFrame(tick)};tick();
    document.querySelectorAll('a,button,.work-card,.skill-row').forEach(el=>{
      el.addEventListener('mouseenter',()=>ring.classList.add('cursor-hover'));
      el.addEventListener('mouseleave',()=>ring.classList.remove('cursor-hover'));
    });
  }
}

document.querySelectorAll('.magnetic').forEach(el=>{
  if(!finePointer)return;
  el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

document.querySelectorAll('[data-tilt]').forEach(card=>{
  if(!finePointer)return;
  card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateY(${x*5}deg) rotateX(${y*-5}deg)`});
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

const data={
 pos:{tag:'01 / SYSTEM',title:'Sistem Kasir Toko Kitab Pondok',desc:'Sistem kasir berbasis Excel VBA yang saya bangun untuk membantu alur penjualan kitab dan pengelolaan data toko pondok.',overview:'Project ini berangkat dari kebutuhan membuat proses kasir toko kitab lebih terstruktur, dari pemilihan pembeli sampai pencatatan transaksi dan stok.',built:'Fokus project ini adalah membuat alur kasir yang lebih praktis: kitab dapat dimuat berdasarkan kelas santri, item bisa diedit atau ditambah, stok divalidasi, transaksi dicatat, dan status piutang dapat dilacak.',role:'Perancangan alur kasir, struktur workbook, VBA interaction, validasi transaksi, dan pengembangan database sheet.',image:'assets/kasir-screenshot.png',alt:'Screenshot asli Sistem Kasir Toko Kitab Pondok',highlights:['Keranjang transaksi dengan Qty yang bisa diedit','Daftar kitab otomatis berdasarkan kelas','Tambah dan hapus kitab dari keranjang','Validasi stok dan mutasi stok','Pencatatan piutang dan pembayaran','Struktur data transaksi dan detail transaksi'],tags:['Excel VBA','POS','Inventory','Database'],links:[]},
 portfolio:{tag:'02 / WEB',title:'Personal Portfolio',desc:'Website portfolio pribadi yang saya gunakan untuk memperkenalkan diri, mendokumentasikan project, dan menunjukkan proses belajar web development.',overview:'Portfolio ini saya bangun sebagai project nyata untuk menerapkan HTML, CSS, dan JavaScript sekaligus belajar membuat pengalaman pengguna yang lebih rapi dan interaktif.',built:'Website ini dibuat dengan HTML, CSS, dan JavaScript tanpa framework besar. Fokusnya adalah typography, responsive layout, animasi yang halus, dan interaksi yang tetap nyaman digunakan.',role:'UI structure, responsive styling, interaction, animation, dan pengembangan halaman dari konsep sampai implementasi.',image:'assets/portfolio-screenshot.png',alt:'Screenshot asli Personal Portfolio Muhyiddin',highlights:['Semantic HTML dan struktur section yang jelas','Responsive desktop, tablet, dan mobile','Dark mode dengan localStorage','Scroll reveal dan micro-interaction','Project showcase dan detail modal','Accessible focus dan reduced-motion support'],tags:['HTML','CSS','JavaScript','Responsive'],links:[{label:'GitHub',href:'https://github.com/muhyidd03-sudo'}]},
 dicoding:{tag:'03 / LEARNING',title:'Dicoding Web Project',desc:'Project latihan web development yang menjadi bagian dari perjalanan belajar saya, terutama dalam semantic HTML, CSS, responsive design, dan JavaScript.',overview:'Project ini dibuat sebagai bagian dari proses belajar web development dan latihan menerapkan struktur HTML semantic, layout CSS, serta navigasi dan tampilan yang responsif.',built:'Project ini saya gunakan untuk memperkuat fondasi frontend melalui tugas dan eksperimen kecil yang bisa langsung diuji di browser.',role:'Mengerjakan struktur halaman, styling, responsive layout, dan pengembangan bertahap mengikuti kebutuhan tugas.',image:'assets/dicoding-screenshot.png',alt:'Screenshot asli project web Dicoding Muhyiddin',highlights:['Semantic HTML','Flexbox dan responsive layout','Typography dan spacing','Dasar interaksi JavaScript','Pengembangan bertahap melalui latihan'],tags:['HTML','CSS','JavaScript','Dicoding'],links:[{label:'Profil Dicoding',href:'https://www.dicoding.com/users/muhyiddin_03hn8f/academies'}]}
};

const modal=document.querySelector('.modal');
const modalBox=document.querySelector('.modal-box');
const modalBg=document.querySelector('.modal-bg');
const closeBtn=document.querySelector('.modal-close');
const tag=document.querySelector('#modal-tag'),title=document.querySelector('#modal-title'),desc=document.querySelector('#modal-desc');
const media=document.querySelector('#modal-project-media'),mediaImg=document.querySelector('#modal-project-image');
const overview=document.querySelector('#modal-overview'),built=document.querySelector('#modal-built'),role=document.querySelector('#modal-role');
const highlights=document.querySelector('#modal-highlights'),tags=document.querySelector('#modal-tags'),actions=document.querySelector('#modal-actions'),count=document.querySelector('#modal-count');
let lastFocus=null;
const projectOrder=['pos','portfolio','dicoding'];
const progressBar=document.querySelector('#case-progress-bar');
const prevBtn=document.querySelector('#case-prev');
const nextBtn=document.querySelector('#case-next');
const prevLabel=document.querySelector('#case-prev-label');
const nextLabel=document.querySelector('#case-next-label');
const navIndex=document.querySelector('#case-nav-index');
let currentProject='pos';
function openModal(key, direction='none'){
  const d=data[key]; if(!d)return;
  currentProject=key;
  lastFocus=document.activeElement;
  const index=projectOrder.indexOf(key);
  tag.textContent=d.tag; title.textContent=d.title; desc.textContent=d.desc;
  overview.textContent=d.overview; built.textContent=d.built; role.textContent=d.role;
  highlights.innerHTML=d.highlights.map(x=>`<li>${x}</li>`).join('');
  tags.innerHTML=d.tags.map(x=>`<span>${x}</span>`).join('');
  count.textContent=String(index+1).padStart(2,'0')+' / 03';
  navIndex.textContent=String(index+1).padStart(2,'0');
  progressBar.style.width=`${((index+1)/projectOrder.length)*100}%`;
  mediaImg.classList.remove('is-loading');
  void mediaImg.offsetWidth;
  mediaImg.src=d.image; mediaImg.alt=d.alt;
  mediaImg.onload=()=>mediaImg.classList.add('is-loaded');
  actions.innerHTML=d.links.length?d.links.map(x=>`<a href="${x.href}" target="_blank" rel="noreferrer">${x.label} <span>↗</span></a>`).join(''):'<span class="no-link">Project showcase</span>';
  const prevIndex=(index-1+projectOrder.length)%projectOrder.length;
  const nextIndex=(index+1)%projectOrder.length;
  prevLabel.textContent=data[projectOrder[prevIndex]].title;
  nextLabel.textContent=data[projectOrder[nextIndex]].title;
  prevBtn.disabled=projectOrder.length<2;
  nextBtn.disabled=projectOrder.length<2;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');body.classList.add('modal-open');
  modalBox?.scrollTo({top:0,behavior:'instant'});
  setTimeout(()=>closeBtn?.focus(),50);
}
function cycleProject(step){
  const index=projectOrder.indexOf(currentProject);
  const nextKey=projectOrder[(index+step+projectOrder.length)%projectOrder.length];
  const activeTrigger=document.querySelector(`[data-project="${nextKey}"] .open-project`) || document.querySelector(`.open-project[data-project-target="${nextKey}"]`);
  if(activeTrigger) lastFocus=activeTrigger;
  openModal(nextKey, step>0?'next':'prev');
}
prevBtn?.addEventListener('click',()=>cycleProject(-1));
nextBtn?.addEventListener('click',()=>cycleProject(1));

function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');body.classList.remove('modal-open');lastFocus?.focus();}
document.addEventListener('click',e=>{const trigger=e.target.closest('.open-project');if(!trigger)return;e.preventDefault();const key=trigger.dataset.projectTarget||trigger.closest('[data-project]')?.dataset.project;openModal(key);});
closeBtn?.addEventListener('click',closeModal);modalBg?.addEventListener('click',closeModal);
addEventListener('keydown',e=>{
  if(!modal.classList.contains('open'))return;
  if(e.key==='Escape')closeModal();
  if(e.key==='ArrowLeft')cycleProject(-1);
  if(e.key==='ArrowRight')cycleProject(1);
});

// Smooth, subtle hero motion.
const hero=document.querySelector('.hero');
if(hero&&finePointer){hero.addEventListener('mousemove',e=>{const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);document.querySelectorAll('.hero-orb').forEach((orb,i)=>orb.style.transform=`translate(${x*(i?18:-12)}px,${y*(i?18:-12)}px)`);});}

/* =========================
   V11 CONTACT INTERACTION
========================= */
(() => {
  const copyBtn = document.querySelector('.copy-email');
  const toast = document.getElementById('toast');
  if (!copyBtn || !toast) return;
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      toast.textContent = 'Email berhasil disalin: ' + email;
    } catch {
      toast.textContent = email;
    }
    toast.classList.add('show');
    clearTimeout(window.__portfolioToastTimer);
    window.__portfolioToastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  });
})();


/* V12 accessibility polish */
addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') {
    menuBtn.click();
    menuBtn.focus();
  }
});

const modalFocusTrap = document.querySelector('.modal');
modalFocusTrap?.addEventListener('keydown', e => {
  if (e.key !== 'Tab' || !modal.classList.contains('open')) return;
  const focusables = [...modal.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
  if (!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

// Give dynamically loaded project media a useful loading state.
const modalProjectImage = document.querySelector('#modal-project-image');
modalProjectImage?.addEventListener('error', () => {
  modalProjectImage.alt = 'Preview project tidak dapat dimuat';
  modalProjectImage.classList.add('is-loaded');
});
