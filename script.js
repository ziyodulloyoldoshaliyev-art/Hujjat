const root=document.documentElement,tbtn=document.getElementById('theme');
let saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
const dark=saved?saved==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
function setTheme(d){root.dataset.theme=d?'dark':'light';tbtn.textContent=d?'☀️':'🌙';try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}}
setTheme(dark);
tbtn.onclick=()=>setTheme(root.dataset.theme!=='dark');

const nav=document.getElementById('nav');
document.getElementById('burger').onclick=()=>nav.classList.toggle('open');
nav.addEventListener('click',e=>{if(e.target.tagName==='A')nav.classList.remove('open')});

document.querySelectorAll('.copy').forEach(b=>b.onclick=()=>{
  const t=b.parentElement.querySelector('code').innerText;
  navigator.clipboard.writeText(t).then(()=>{b.textContent='Nusxalandi';setTimeout(()=>b.textContent='Nusxa',1500)}).catch(()=>{});
});

const links=[...nav.querySelectorAll('a')];
const secs=[...document.querySelectorAll('section, h3[id]')];
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-20% 0px -70% 0px'});
secs.forEach(s=>s.id&&io.observe(s));

const q=document.getElementById('q'),empty=document.getElementById('empty'),sections=[...document.querySelectorAll('main section')];
function clearMarks(){document.querySelectorAll('mark').forEach(m=>m.replaceWith(document.createTextNode(m.textContent)));document.querySelectorAll('main').forEach(m=>m.normalize())}
q.addEventListener('input',()=>{
  clearMarks();
  const v=q.value.trim().toLowerCase();let shown=0;
  sections.forEach(s=>{
    const ok=!v||s.textContent.toLowerCase().includes(v);
    s.style.display=ok?'':'none';if(ok)shown++;
    if(ok&&v){
      const w=document.createTreeWalker(s,NodeFilter.SHOW_TEXT);const hits=[];
      while(w.nextNode()){const n=w.currentNode;if(n.parentElement.closest('pre,button,script'))continue;if(n.textContent.toLowerCase().includes(v))hits.push(n)}
      hits.forEach(n=>{
        const i=n.textContent.toLowerCase().indexOf(v);
        const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+v.length);
        const m=document.createElement('mark');r.surroundContents(m);
      });
    }
  });
  empty.style.display=shown?'none':'block';
});
