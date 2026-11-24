// FERO BLACK — comportamentos novos (v2). Carrega depois de base.js.
(function(){
  // Barra de compra fixa no celular: aparece depois do hero, some quando os kits estão na tela.
  const sticky=document.getElementById('stickyCta');
  const hero=document.querySelector('.hero');
  const kits=document.getElementById('kits');
  if(sticky&&hero){
    let kitsVisible=false,heroGone=false;
    const update=()=>sticky.classList.toggle('show',heroGone&&!kitsVisible);
    if('IntersectionObserver' in window){
      new IntersectionObserver(e=>{heroGone=!e[0].isIntersecting;update()},{threshold:0}).observe(hero);
      if(kits) new IntersectionObserver(e=>{kitsVisible=e[0].isIntersecting;update()},{threshold:.15}).observe(kits);
    }
  }
  // Links dos kits: enquanto não configurados (href="#"), levam de volta aos kits sem quebrar a página.
  document.querySelectorAll('[data-kit-link]').forEach(a=>{
    a.addEventListener('click',e=>{if(a.getAttribute('href')==='#')e.preventDefault()});
  });
  // Menu do celular: Escape fecha e devolve o foco ao botão.
  const menuBtn=document.getElementById('menuToggle'), menuNav=document.getElementById('mobileNav');
  if(menuBtn&&menuNav){
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&menuNav.classList.contains('open')){
        menuNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded','false');
        menuBtn.textContent='Menu';
        menuBtn.focus();
      }
    });
  }
  // Divisores animados: a linha dourada se desenha quando entra na tela.
  const dividers=document.querySelectorAll('.divider');
  if('IntersectionObserver' in window){
    const dio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');dio.unobserve(e.target)}}),{rootMargin:'0px 0px -12% 0px'});
    dividers.forEach(d=>dio.observe(d));
  } else dividers.forEach(d=>d.classList.add('in'));
  // FAQ: abrir uma pergunta fecha as outras.
  const items=document.querySelectorAll('.questions details');
  items.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)items.forEach(o=>{if(o!==d)o.open=false})}));
})();
