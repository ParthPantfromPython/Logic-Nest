window.logicNestProjects = [
  { title:'Nexus AI', description:'Home Command Center — an AI-powered dashboard and productivity workspace.', tags:['AI','Dashboard','Web','Productivity'], icon:'NX', image:'Gemini_Generated_Image_zbt2ejzbt2ejzbt2.png', demo:'https://career-with-nexus-ai.lovable.app/home', source:'', featured:true },
  { title:'Interactive Periodic Table', description:'🌈 Modern chemistry explorer with an interactive periodic table experience.', tags:['Chemistry','Education','Interactive','JavaScript'], icon:'🧪', image:'Gemini_Generated_Image_f72yx0f72yx0f72y.png', demo:'https://parthpantfrompython.github.io/Website/index.html', source:'', featured:false },
  { title:'Indigenous Art & Nature', description:'Explore indigenous art, culture, nature, and visual storytelling through an interactive web experience.', tags:['Art','Culture','Nature','Education','Web'], icon:'🌿', image:'Gemini_Generated_Image_f72yx0f72yx0f72y.png', demo:'https://parthpantfrompython.github.io/Website/Home.html', source:'', featured:false },
  { title:'JARVIS Online', description:'AI Assistant Dashboard with Voice, Chat & PC Control.', tags:['AI','Assistant','Voice','Chat','Dashboard'], icon:'JX', image:'Gemini_Generated_Image_zbt2ejzbt2ejzbt2.png', demo:'https://jarvisforos.lovable.app/', source:'', featured:false },
  { title:'Kids Needs Store', description:'🧸 A cheerful kids-focused online store experience for little things and big joy.', tags:['Ecommerce','Kids','Shopping','Replit','Web'], icon:'🛍️', image:'Gemini_Generated_Image_f72yx0f72yx0f72y.png', demo:'https://kids-store--parthpant.replit.app/', source:'', featured:false }
];

(function(){
  const fallback=window.logicNestProjects.slice();
  let allProjects=fallback.slice();
  let activeFilter='All';
  let query='';
  let mounted=false;

  const esc=(s='')=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c]));
  const findByText=(selector,text)=>[...document.querySelectorAll(selector)].find(el=>(el.textContent||'').trim().toLowerCase().includes(text.toLowerCase()));

  function normalizeRemote(rows){
    return rows.map(p=>({
      title:p.title||'Untitled Project',
      description:p.description||'A Logic Nest project.',
      tags:Array.isArray(p.tags)?p.tags:[], icon:p.icon||'LN',
      image:p.image_url||'', demo:p.demo_url||'', source:p.source_url||'',
      featured:!!p.featured, published:p.published!==false, remoteId:p.id||null
    }));
  }

  function merged(remote){
    const out=fallback.map(x=>({...x}));
    remote.filter(x=>x.published!==false).forEach(item=>{
      const i=out.findIndex(x=>x.title===item.title);
      if(i>=0) out[i]={...out[i],...item}; else out.push(item);
    });
    return out;
  }

  function projectMarkup(p){
    const img=p.image||'';
    return `<article class="project" data-project-title="${esc(p.title)}">${p.featured?'<span class="featuredBadge">Featured</span>':''}<div class="projectImage">${img?`<img src="${esc(img)}" alt="${esc(p.title)} preview" loading="lazy">`:`<span class="fallbackIcon">${esc(p.icon||'LN')}</span>`}</div><div class="projectBody"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><div class="chips">${(p.tags||[]).slice(0,5).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div><div class="projectLinks">${p.demo?`<a class="projectLink" href="${esc(p.demo)}" target="_blank" rel="noreferrer">Live ↗</a>`:''}${p.source?`<a class="projectLink" href="${esc(p.source)}" target="_blank" rel="noreferrer">Source ↗</a>`:''}</div></div></article>`;
  }

  function renderFeatured(rows){
    const featured=rows.find(x=>x.featured)||rows[0];
    if(!featured) return;
    const box=document.querySelector('.spotlightBox');
    if(!box) return;
    const copy=box.querySelector('.spotlightCopy');
    const media=box.querySelector('.spotlightMedia');
    if(copy){
      copy.innerHTML=`<span class="eyebrow">FEATURED BUILD</span><h2>${esc(featured.title)}</h2><p>${esc(featured.description||'Featured Logic Nest project.')}</p><div class="spotlightTags">${(featured.tags||[]).slice(0,5).map(t=>`<span class="metaPill">${esc(t)}</span>`).join('')}</div><div class="actions" style="margin-top:20px">${featured.demo?`<a class="btn primary" href="${esc(featured.demo)}" target="_blank" rel="noreferrer">Open project ↗</a>`:''}${featured.source?`<a class="btn secondary" href="${esc(featured.source)}" target="_blank" rel="noreferrer">View source ↗</a>`:''}</div>`;
    }
    if(media){media.innerHTML=featured.image?`<img src="${esc(featured.image)}" alt="${esc(featured.title)} preview" loading="eager"><div class="spotlightMediaShade"></div>`:`<div style="height:100%;min-height:290px;display:grid;place-items:center;font:900 42px ui-monospace;color:var(--accent)">${esc(featured.icon||'LN')}</div>`;}
  }

  function updateStats(rows){
    const allStats=[...document.querySelectorAll('.stats .stat')];
    allStats.forEach(card=>{
      const label=(card.querySelector('span')?.textContent||'').trim().toLowerCase();
      const value=card.querySelector('strong')||card.querySelector('b');
      if(!value) return;
      if(label.includes('published')) value.textContent=String(rows.filter(p=>p.published!==false).length);
      else if(label.includes('idea')) value.textContent='∞';
      else if(label.includes('track')) value.textContent='3';
      else if(label.includes('goal')) value.textContent='1';
    });
  }

  function render(){
    const grid=document.getElementById('projectGrid');
    if(!grid) return;
    const filtered=allProjects.filter(p=>{
      const q=query.trim().toLowerCase();
      const matchesQuery=!q||`${p.title} ${p.description} ${(p.tags||[]).join(' ')}`.toLowerCase().includes(q);
      const matchesFilter=activeFilter==='All'||(activeFilter==='Featured'&&p.featured)||(activeFilter!=='Featured'&&((p.tags||[]).some(t=>String(t).toLowerCase()===activeFilter.toLowerCase())));
      return matchesQuery&&matchesFilter;
    });
    grid.innerHTML=filtered.length?filtered.map(projectMarkup).join(''):'<div class="empty">No projects match this search yet.</div>';
    renderFeatured(allProjects);
    updateStats(allProjects);
  }

  function wire(){
    if(mounted||!document.getElementById('projectGrid')) return;
    mounted=true;
    const search=document.querySelector('#projects .search')||document.querySelector('input[placeholder*="Search projects"]');
    if(search) search.addEventListener('input',e=>{query=e.target.value;render();});
    document.querySelectorAll('#projects .filter').forEach(btn=>btn.addEventListener('click',()=>{
      document.querySelectorAll('#projects .filter').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      activeFilter=btn.textContent.trim()||'All';
      render();
    }));
    render();
    document.dispatchEvent(new CustomEvent('logicNestProjectsReady'));
  }

  async function sync(){
    try{
      const cfg=window.LOGIC_NEST_SUPABASE;
      if(!cfg||!window.supabase) return;
      const sb=window.supabase.createClient(cfg.url,cfg.publishableKey);
      const {data,error}=await sb.from('projects').select('*').eq('published',true).order('created_at',{ascending:true});
      if(error||!Array.isArray(data)||!data.length) return;
      allProjects=merged(normalizeRemote(data));
      render();
    }catch(e){ console.warn('Logic Nest project sync skipped:',e); }
  }

  function boot(){
    wire();
    sync();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();

  // Keep the public site resilient if another script finishes late.
  const retry=setInterval(()=>{wire();if(mounted)clearInterval(retry)},250);

  // Expose a tiny safe refresh hook for future admin changes.
  window.refreshLogicNestProjects=async()=>{await sync();render();};
})();

(function addLogicNestLabHub(){
  const boot=()=>{
    const topLab=document.querySelector('.links a[href="lab.html"]');
    if(topLab) topLab.remove();
    const projects=document.getElementById('projects');
    if(!projects||document.getElementById('labHub')) return;
    const section=document.createElement('section');
    section.id='labHub';
    section.className='logicLabHub';
    section.innerHTML=`<div class="wrap"><div class="logicLabBox"><div><span class="eyebrow">LOGIC NEST LAB</span><h2>Build something of your own.</h2><p>Use the browser-based Lab to create, experiment, preview and refine HTML, CSS and JavaScript projects.</p><div class="logicLabTags"><span class="metaPill"><b>LIVE</b> sandbox</span><span class="metaPill">Multi-file</span><span class="metaPill">Checkpoints</span></div></div><div class="logicLabAction"><div class="logicLabOrb">⌘</div><a class="btn primary" href="lab-ultra.html">Open Lab →</a><span>Logic Nest Lab Ultra</span></div></div></div>`;
    projects.insertAdjacentElement('afterend',section);
    const style=document.createElement('style');
    style.textContent=`.logicLabHub{padding:30px 0 72px}.logicLabBox{display:grid;grid-template-columns:1.12fr .88fr;gap:24px;align-items:center;padding:32px;border:1px solid color-mix(in srgb,var(--accent) 22%,var(--line));border-radius:24px;background:radial-gradient(circle at 88% 25%,color-mix(in srgb,var(--accent2) 12%,transparent),transparent 35%),linear-gradient(120deg,color-mix(in srgb,var(--panel) 96%,transparent),color-mix(in srgb,var(--accent) 6%,var(--panel)));box-shadow:var(--shadow)}.logicLabBox h2{margin:11px 0 8px;font-size:42px;line-height:1.03;letter-spacing:-.05em}.logicLabBox p{margin:0;max-width:680px;color:var(--muted)}.logicLabTags{display:flex;gap:8px;flex-wrap:wrap;margin-top:17px}.logicLabAction{min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border:1px solid var(--line);border-radius:20px;background:color-mix(in srgb,var(--panel) 78%,transparent)}.logicLabOrb{width:104px;height:104px;border-radius:50%;display:grid;place-items:center;font:900 35px ui-monospace;color:var(--accent);border:1px solid color-mix(in srgb,var(--accent) 38%,var(--line));background:radial-gradient(circle,var(--glow),transparent 67%),var(--panel);box-shadow:0 0 55px color-mix(in srgb,var(--accent) 17%,transparent),inset 0 0 35px color-mix(in srgb,var(--accent2) 9%,transparent)}.logicLabAction>span{color:var(--muted);font-size:11px;font-weight:800}@media(max-width:760px){.logicLabBox{grid-template-columns:1fr}.logicLabAction{min-height:190px}.logicLabBox h2{font-size:34px}}`;
    document.head.appendChild(style);
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();

(function refineLogicNestProjects(){
  const style=document.createElement('style');
  style.textContent=`.project{position:relative;overflow:hidden}.project::after{content:'';position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,.04) 42%,transparent 60%);transform:translateX(-120%);transition:transform .7s ease}.project:hover::after{transform:translateX(120%)}.ln-featured{position:absolute;top:12px;right:12px;z-index:3;padding:6px 9px;border-radius:999px;background:color-mix(in srgb,var(--accent) 18%,var(--panel));border:1px solid color-mix(in srgb,var(--accent) 38%,var(--line));color:var(--accent);font:900 10px/1 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(8px)}.ln-project-reveal{opacity:0;transform:translateY(12px);transition:opacity .45s ease,transform .45s ease}.ln-project-reveal.is-visible{opacity:1;transform:none}.spotlightMedia{position:relative;overflow:hidden}.spotlightMedia img{display:block;width:100%;height:100%;min-height:290px;object-fit:cover}.spotlightMediaShade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(3,8,15,.45))}`;
  document.head.appendChild(style);
  const decorate=()=>{const grid=document.getElementById('projectGrid');if(!grid)return;[...grid.querySelectorAll('.project')].forEach((card,i)=>{card.classList.add('ln-project-reveal');setTimeout(()=>card.classList.add('is-visible'),Math.min(i,8)*55)});};
  const boot=()=>{const grid=document.getElementById('projectGrid');if(!grid)return;new MutationObserver(decorate).observe(grid,{childList:true,subtree:true});decorate()};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
