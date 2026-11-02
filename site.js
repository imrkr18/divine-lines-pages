(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') { menu?.setAttribute('aria-expanded','false');nav?.classList.remove('open'); }});
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {menu?.setAttribute('aria-expanded','false');nav.classList.remove('open');}));
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(e => {if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}),{threshold:0.09});
    document.querySelectorAll('[data-reveal]').forEach(el => {const r=el.getBoundingClientRect();if(r.top>window.innerHeight){el.classList.add('will-reveal');observer.observe(el);}});
    reduced.addEventListener('change', e => {if(e.matches){document.querySelectorAll('.will-reveal').forEach(el=>el.classList.add('revealed'));observer.disconnect();}});
  }
  let ticking=false;
  const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    document.querySelector('.reading-progress').style.transform=`scaleX(${max>0?scrollY/max:0})`;
    document.querySelector('.site-header').classList.toggle('scrolled',scrollY>20);
    ticking=false;
  });};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  const themes={charcoal:['Minimal Charcoal','Quiet contrast. A clear space for the words.','Included in the free experience'],dawn:['Serene Dawn','Soft rose and violet. A gentler start to the day.','Included in the free experience'],sage:['Nature Sage','Deep greens. A moment grounded in stillness.','A premium visual theme'],sunrise:['Sunrise Gold','Warm earth and amber. A little light to carry.','A premium visual theme']};
  document.querySelectorAll('.swatch').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.theme;const [name,description,tier]=themes[key];
    document.querySelector('#theme-preview').dataset.theme=key;
    document.querySelector('#theme-name').textContent=name;document.querySelector('#theme-description').textContent=description;document.querySelector('#theme-tier').textContent=tier;
    document.querySelectorAll('.swatch').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  }));
})();