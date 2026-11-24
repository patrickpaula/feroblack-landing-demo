const header=document.getElementById('siteHeader'), toggle=document.getElementById('menuToggle'), mobileNav=document.getElementById('mobileNav');
function updateHeader(){header.classList.toggle('scrolled',window.scrollY>25)}
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
toggle.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close':'Menu'});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu'}));
document.getElementById('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){document.body.classList.add('js');const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.10});document.querySelectorAll('.reveal').forEach(e=>io.observe(e))}

// Quiet cinematic effects: only run motion on screens and preferences that support it.
(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wideScreen = window.matchMedia('(min-width: 901px)');
  const progress = document.querySelector('.scroll-progress');
  const hero = document.querySelector('.hero');
  const heroPhoto = document.querySelector('.hero-photo');
  const photoScenes = Array.from(document.querySelectorAll('.intro-image,.product-photo,.universe,.buy-photo'));
  let scheduled = false;
  function drawScroll(){
    scheduled=false;
    const max = Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const y = Math.max(0,window.scrollY);
    if(progress) progress.style.transform='scaleX('+Math.min(1,y/max)+')';
    if(reduceMotion.matches){
      if(heroPhoto) heroPhoto.style.setProperty('--hero-shift','0px');
      photoScenes.forEach(scene=>scene.style.setProperty('--scene-shift','0px'));
      return;
    }
    if(heroPhoto && wideScreen.matches){
      const offset = Math.min(hero.offsetHeight,y);
      heroPhoto.style.setProperty('--hero-shift',Math.round(offset*.12)+'px');
    } else if(heroPhoto) heroPhoto.style.setProperty('--hero-shift','0px');
    if(wideScreen.matches){
      photoScenes.forEach(scene=>{
        const r=scene.getBoundingClientRect();
        if(r.bottom < -100 || r.top > window.innerHeight+100) return;
        const relative=(r.top + r.height/2 - window.innerHeight/2)/(window.innerHeight/2 + r.height/2);
        const shift=Math.max(-27,Math.min(27,relative*-27));
        scene.style.setProperty('--scene-shift',shift.toFixed(1)+'px');
      });
    } else photoScenes.forEach(scene=>scene.style.setProperty('--scene-shift','0px'));
  }
  function onScroll(){if(!scheduled){scheduled=true;requestAnimationFrame(drawScroll)}}
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});
  reduceMotion.addEventListener?.('change',onScroll);drawScroll();
  if(!reduceMotion.matches && wideScreen.matches && hero){
    let pointerFrame=false, mx=0, my=0;
    hero.addEventListener('pointermove',e=>{
      if(e.pointerType==='touch') return;
      const r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width*100;my=(e.clientY-r.top)/r.height*100;
      if(!pointerFrame){pointerFrame=true;requestAnimationFrame(()=>{pointerFrame=false;hero.style.setProperty('--glow-x',mx.toFixed(1)+'%');hero.style.setProperty('--glow-y',my.toFixed(1)+'%')})}
    },{passive:true});
    hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--glow-x','70%');hero.style.setProperty('--glow-y','55%')});
  }
  const bottleScene=document.querySelector('.product-photo');
  if(bottleScene && !reduceMotion.matches){
    let bottleFrame=false, bx=50, by=50;
    bottleScene.addEventListener('pointermove',e=>{
      if(e.pointerType==='touch')return;
      const r=bottleScene.getBoundingClientRect();bx=(e.clientX-r.left)/r.width*100;by=(e.clientY-r.top)/r.height*100;
      if(!bottleFrame){bottleFrame=true;requestAnimationFrame(()=>{bottleFrame=false;bottleScene.style.setProperty('--light-x',bx.toFixed(1)+'%');bottleScene.style.setProperty('--light-y',by.toFixed(1)+'%')})}
    },{passive:true});
    bottleScene.addEventListener('pointerleave',()=>{bottleScene.style.setProperty('--light-x','58%');bottleScene.style.setProperty('--light-y','46%')});
  }
})();
