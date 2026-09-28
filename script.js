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

// V19: make all internal anchor buttons/links scroll reliably on every device.
const scrollToSection = (id, updateUrl = true) => {
  const target = document.getElementById(id);
  if (!target) return false;
  const navHeight = navWrap?.getBoundingClientRect().height || 0;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight - 12);
  window.scrollTo({ top, behavior: 'smooth' });
  if (updateUrl) history.replaceState(null, '', `#${id}`);
  return true;
};

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const id=link.getAttribute('href')?.slice(1);
    if(!id) return;
    if(scrollToSection(id)) e.preventDefault();
  });
});

document.querySelectorAll('.hero-scroll[data-scroll-target]').forEach(button=>{
  button.addEventListener('click',e=>{
    const id=button.dataset.scrollTarget;
    if(scrollToSection(id)) e.preventDefault();
  });
});

const savedTheme=localStorage.getItem('muhyiddin-theme');
if(savedTheme==='dark') body.classList.add('dark-mode');
const syncThemeButton = () => {
  const dark = body.classList.contains('dark-mode');
  themeBtn?.setAttribute('aria-pressed', String(dark));
  themeBtn?.setAttribute('aria-label', dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
};
syncThemeButton();
themeBtn?.addEventListener('click',()=>{
  body.classList.toggle('dark-mode');
  localStorage.setItem('muhyiddin-theme',body.classList.contains('dark-mode')?'dark':'light');
  syncThemeButton();
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
 pos:{tag:'01 / SYSTEM',title:'Sistem Kasir Toko Kitab Pondok',desc:'Sistem kasir berbasis Excel VBA yang saya bangun untuk membuat proses penjualan kitab, pengelolaan stok, dan pencatatan transaksi lebih terstruktur.',overview:'Project ini berangkat dari kebutuhan membuat proses kasir toko kitab lebih terstruktur, mulai dari pemilihan pembeli, keranjang transaksi, hingga pencatatan stok.',built:'Saya membuat alur kasir yang lebih praktis: kitab dapat dimuat berdasarkan kelas santri, item bisa diedit atau ditambah, stok divalidasi, transaksi dicatat, dan piutang dapat dilacak.',role:'Merancang alur kasir, struktur workbook, interaksi VBA, validasi transaksi, dan struktur database di dalam workbook.',image:'assets/kasir-screenshot.webp',alt:'Screenshot asli Sistem Kasir Toko Kitab Pondok',highlights:['Keranjang transaksi dengan Qty yang bisa diedit','Daftar kitab otomatis berdasarkan kelas','Tambah dan hapus kitab dari keranjang','Validasi stok dan mutasi stok','Pencatatan piutang dan pembayaran','Struktur data transaksi dan detail transaksi'],tags:['Excel VBA','POS','Inventory','Database'],links:[]},
 portfolio:{tag:'02 / WEB',title:'Personal Portfolio',desc:'Website portfolio pribadi untuk memperkenalkan diri, menampilkan project, dan mendokumentasikan perjalanan belajar web development.',overview:'Portfolio ini saya bangun sebagai project nyata untuk menerapkan HTML, CSS, dan JavaScript sekaligus belajar merancang pengalaman pengguna yang rapi dan interaktif.',built:'Website ini dibuat dengan HTML, CSS, dan JavaScript tanpa framework. Fokusnya pada typography, responsive layout, animasi halus, dark mode, dan interaksi yang tetap nyaman digunakan.',role:'Mengerjakan struktur UI, responsive styling, interaction, animation, dan pengembangan halaman dari konsep hingga implementasi.',image:'assets/portfolio-screenshot.webp',alt:'Screenshot asli Personal Portfolio Muhyiddin',highlights:['Semantic HTML dan struktur section yang jelas','Responsive desktop, tablet, dan mobile','Dark mode dengan localStorage','Scroll reveal dan micro-interaction','Project showcase dan detail modal','Accessible focus dan reduced-motion support'],tags:['HTML','CSS','JavaScript','Responsive'],links:[{label:'GitHub',href:'https://github.com/muhyidd03-sudo'}]},
 dicoding:{tag:'03 / LEARNING',title:'Dicoding Web Project',desc:'Project latihan dari pembelajaran Dicoding untuk memperkuat dasar semantic HTML, CSS, layout responsive, dan penyusunan halaman web.',overview:'Project ini dibuat sebagai bagian dari proses belajar web development, dengan fokus pada semantic HTML, layout CSS, navigasi, dan tampilan yang responsif.',built:'Project ini saya gunakan untuk memperkuat fondasi frontend melalui tugas dan latihan yang langsung diterapkan dan diuji di browser.',role:'Mengerjakan struktur halaman, styling, responsive layout, dan pengembangan bertahap mengikuti kebutuhan tugas.',image:'assets/dicoding-screenshot.webp',alt:'Screenshot asli project web Dicoding Muhyiddin',highlights:['Semantic HTML','Flexbox dan responsive layout','Typography dan spacing','Navigasi halaman yang terstruktur','Pengembangan bertahap melalui latihan'],tags:['HTML','CSS','Dicoding'],links:[{label:'Profil Dicoding',href:'https://www.dicoding.com/users/muhyiddin_03hn8f/academies'}]}
};

/* V28 SELECTED WORK — reference-style continuous stacked slider */
const showcaseTrack = document.querySelector('#showcase-track');
const showcaseTag = document.querySelector('#showcase-tag');
const showcaseTitle = document.querySelector('#showcase-title');
const showcaseDesc = document.querySelector('#showcase-desc');
const showcaseTags = document.querySelector('#showcase-tags');
const showcaseView = document.querySelector('.showcase-view');
const showcaseCurrent = document.querySelector('#showcase-current');
const showcaseOrder = ['pos','portfolio','dicoding'];
let showcaseProject = 0;
let showcaseBusy = false;
let showcaseCards = [];
let showcaseTimer = null;

const showcaseCopy = {
  pos:{tag:'01 / SYSTEM',title:'Sistem Kasir Toko Kitab Pondok',desc:'Sistem kasir berbasis Excel VBA untuk mengelola transaksi, stok, kitab per kelas, piutang, pembayaran, dan laporan.',image:'assets/kasir-screenshot.webp',alt:'Screenshot Sistem Kasir Toko Kitab Pondok',tags:['VBA','Excel','Database']},
  portfolio:{tag:'02 / WEB',title:'Personal Portfolio',desc:'Portfolio responsive dengan visual minimal, animasi halus, dark mode, dan interaksi modern.',image:'assets/portfolio-screenshot.webp',alt:'Screenshot Personal Portfolio Muhyiddin',tags:['HTML','CSS','JavaScript']},
  dicoding:{tag:'03 / LEARNING',title:'Dicoding Web Project',desc:'Project latihan Dicoding yang berfokus pada semantic HTML, CSS layout, dan responsive design.',image:'assets/dicoding-screenshot.webp',alt:'Screenshot Dicoding Web Project Muhyiddin',tags:['HTML','CSS']}
};

function modIndex(n){ return (n + showcaseOrder.length) % showcaseOrder.length; }
function projectForSlot(slot){ return showcaseOrder[modIndex(showcaseProject + slot)]; }

/* Five visual slots, exactly like the reference animation:
   far-left -> near-left -> center -> near-right -> far-right.
   We reuse the user's 3 real projects rather than inventing extra projects. */
const slotNames = ['far-left','near-left','center','near-right','far-right'];
const slotClassMap = {
  '-4':'showcase-pos-off-left',
  '-3':'showcase-pos-off-left',
  '-2':'showcase-pos-far-left',
  '-1':'showcase-pos-near-left',
  '0':'showcase-pos-center',
  '1':'showcase-pos-near-right',
  '2':'showcase-pos-far-right',
  '3':'showcase-pos-off-right',
  '4':'showcase-pos-off-right'
};

function setSlot(card, slot){
  Object.values(slotClassMap).forEach(c=>card.classList.remove(c));
  const cls=slotClassMap[String(slot)];
  if(cls) card.classList.add(cls);
  card.dataset.slot=String(slot);
  card.setAttribute('aria-hidden', Math.abs(slot)>2 ? 'true':'false');
}
function setCardProject(card,key){
  const d=showcaseCopy[key];
  card.dataset.project=key;
  card.setAttribute('aria-label',`Buka ${d.title}`);
  const img=card.querySelector('img');
  if(img){img.src=d.image;img.alt=d.alt;}
}
function renderShowcaseCopy(animate=true){
  const key=showcaseOrder[showcaseProject];
  const d=showcaseCopy[key];
  showcaseTag.textContent=d.tag;
  showcaseTitle.textContent=d.title;
  showcaseDesc.textContent=d.desc;
  showcaseTags.innerHTML=d.tags.map(t=>`<span>${t}</span>`).join('');
  if(showcaseCurrent) showcaseCurrent.textContent=String(showcaseProject+1).padStart(2,'0');
  const info=document.querySelector('.showcase-info');
  if(animate && info){
    info.classList.remove('showcase-copy-in');
    void info.offsetWidth;
    info.classList.add('showcase-copy-in');
  }
}
function buildShowcaseCards(){
  if(!showcaseTrack)return;
  showcaseTrack.innerHTML='';
  showcaseCards=[];
  for(let slot=-3; slot<=3; slot++){
    const key=projectForSlot(slot);
    const d=showcaseCopy[key];
    const card=document.createElement('button');
    card.type='button';
    card.className='showcase-card';
    card.innerHTML=`<span class="showcase-card-media"><img src="${d.image}" alt="${d.alt}" loading="lazy"></span>`;
    card.addEventListener('click',()=>{
      const s=Number(card.dataset.slot);
      if(s<0) moveShowcase(-1);
      else if(s>0) moveShowcase(1);
      else openProjectFromShowcase(card.dataset.project);
    });
    showcaseTrack.appendChild(card);
    showcaseCards.push(card);
    setCardProject(card,key);
    setSlot(card,slot);
  }
}
function renderShowcase(){
  if(!showcaseTrack)return;
  buildShowcaseCards();
  renderShowcaseCopy(false);
  requestAnimationFrame(()=>showcaseCards.forEach((c,i)=>setSlot(c,i-3)));
}
function openProjectFromShowcase(key){
  const target=document.querySelector(`.open-project[data-project-target="${key}"]`);
  if(target) target.click();
  else if(typeof openModal==='function') openModal(key);
}
function moveShowcase(step, fromAuto=false){
  if(showcaseBusy || !showcaseTrack)return;
  const direction=step>0?1:-1;
  showcaseBusy=true;
  showcaseProject=modIndex(showcaseProject+direction);

  /* Shift every card exactly one slot. No nth-child selectors are used,
     so recycled cards never jump to the wrong side. */
  showcaseCards.forEach(card=>{
    const old=Number(card.dataset.slot);
    setSlot(card,old-direction);
  });
  renderShowcaseCopy(true);

  window.setTimeout(()=>{
    /* Recycle the card that left the visible range. */
    const recycled=showcaseCards.find(card=>Math.abs(Number(card.dataset.slot))>3);
    if(recycled){
      const newSlot=direction>0 ? 3 : -3;
      recycled.style.transition='none';
      setCardProject(recycled,projectForSlot(newSlot));
      setSlot(recycled,newSlot);
      void recycled.offsetWidth;
      recycled.style.transition='';
    }
    showcaseBusy=false;
  },1380);
}
function startShowcaseAuto(){
  if(showcaseTimer) clearInterval(showcaseTimer);
  showcaseTimer=setInterval(()=>moveShowcase(1,true),4200);
}
function stopShowcaseAuto(){ if(showcaseTimer) clearInterval(showcaseTimer); showcaseTimer=null; }
document.addEventListener('keydown',e=>{
  if(document.querySelector('.modal.open'))return;
  if(e.key==='ArrowLeft'){stopShowcaseAuto();moveShowcase(-1);startShowcaseAuto();}
  if(e.key==='ArrowRight'){stopShowcaseAuto();moveShowcase(1);startShowcaseAuto();}
});
if(showcaseTrack){renderShowcase();startShowcaseAuto();}

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

addEventListener('keydown',e=>{
  if(modal.classList.contains('open')) return;
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

/* V22 CERTIFICATE GALLERY */
(() => {
  const items = [
    {kicker:'01 / WEB DEVELOPMENT', title:'Short Class Website Development Pakai WordPress', image:'assets/certificate-wordpress.webp', alt:'Sertifikat Short Class Website Development Pakai WordPress'},
    {kicker:'02 / WEB DEVELOPMENT', title:'Belajar Dasar Pemrograman Web', image:'assets/certificate-dicoding.webp', alt:'Sertifikat Dicoding Belajar Dasar Pemrograman Web'},
    {kicker:'03 / OFFICE', title:'Microsoft Office Specialist — Intermediate', image:'assets/certificate-office.webp', alt:'Sertifikat Microsoft Office Specialist Intermediate'},
    {kicker:'04 / HTML & CSS', title:'Dasar HTML & CSS — Dicoding', image:'assets/certificate-html-css.webp', alt:'Materi Dicoding dasar HTML dan CSS'}
  ];
  let current = 0;
  const mainImg = document.getElementById('certificate-main-image');
  const mainKicker = document.getElementById('certificate-main-kicker');
  const mainTitle = document.getElementById('certificate-main-title');
  const mainDesc = document.getElementById('certificate-main-desc');
  const cards = [...document.querySelectorAll('.certificate-card')];
  const modal = document.getElementById('certificate-modal');
  const modalImg = document.getElementById('certificate-modal-image');
  const modalKicker = document.getElementById('certificate-modal-kicker');
  const modalTitle = document.getElementById('certificate-modal-title');
  const modalCount = document.getElementById('certificate-modal-count');
  const close = document.querySelector('.certificate-modal-close');
  const bg = document.querySelector('.certificate-modal-bg');
  const prev = document.getElementById('certificate-prev');
  const next = document.getElementById('certificate-next');
  const mainBtn = document.querySelector('.certificate-main-btn');
  const body = document.body;
  let lastFocus = null;

  function render(index) {
    current = (index + items.length) % items.length;
    const d = items[current];
    if (mainImg) { mainImg.src = d.image; mainImg.alt = d.alt; }
    if (mainKicker) mainKicker.textContent = d.kicker;
    if (mainTitle) mainTitle.textContent = d.title;
    if (mainDesc) mainDesc.textContent = current === 0
      ? 'Certificate of Appreciation dari Short Class Website Development Pakai WordPress, KarirNex by PT Ebiz Karisma Internasional (31 Agustus 2026).'
      : current === 1
        ? 'Sertifikat kompetensi kelulusan Dicoding untuk kelas Belajar Dasar Pemrograman Web (6 September 2026).'
        : current === 2
          ? 'Certificate of Appreciation untuk Bootcamp Sertifikasi Microsoft Office Excel, Word & PowerPoint Specialist tingkat Intermediate, KarirNex by PT Ebiz Karisma Internasional (10, 12, 14, 18, 20, dan 24 Agustus 2026).'
          : 'Materi pembelajaran Dicoding tentang dasar HTML, CSS, dan layout responsif sebagai fondasi pengembangan website.';
    cards.forEach((card,i)=>{
      card.classList.toggle('is-active', i === current);
      card.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }

  function openCert(index) {
    lastFocus = document.activeElement;
    render(index);
    const d = items[current];
    modalImg.src = d.image;
    modalImg.alt = d.alt;
    modalKicker.textContent = d.kicker;
    modalTitle.textContent = d.title;
    modalCount.textContent = `${String(current+1).padStart(2,'0')} / 04`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    body.classList.add('modal-open');
    setTimeout(() => close?.focus(), 30);
  }
  function closeCert() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    body.classList.remove('modal-open');
    lastFocus?.focus();
  }
  cards.forEach((card,i)=>card.addEventListener('click',()=>{render(i); openCert(i);}));
  mainBtn?.addEventListener('click',()=>openCert(current));
  prev?.addEventListener('click',()=>openCert(current-1));
  next?.addEventListener('click',()=>openCert(current+1));
  close?.addEventListener('click',closeCert);
  bg?.addEventListener('click',closeCert);
  document.addEventListener('keydown',e=>{
    if(!modal.classList.contains('open')) return;
    if(e.key==='Escape') closeCert();
    if(e.key==='ArrowLeft') openCert(current-1);
    if(e.key==='ArrowRight') openCert(current+1);
  });
  render(0);
})();
