window.logicNestProjects = [
  { title:'Nexus AI', description:'Home Command Center — an AI-powered dashboard and productivity workspace.', tags:['AI','Dashboard','Web','Productivity'], icon:'NX', image:'Gemini_Generated_Image_zbt2ejzbt2ejzbt2.png', demo:'https://career-with-nexus-ai.lovable.app/home', source:'', featured:true },
  { title:'Interactive Periodic Table', description:'🌈 Modern chemistry explorer with an interactive periodic table experience.', tags:['Chemistry','Education','Interactive','JavaScript'], icon:'🧪', image:'Gemini_Generated_Image_f72yx0f72yx0f72y.png', demo:'https://parthpantfrompython.github.io/Website/index.html', source:'', featured:false },
  { title:'Indigenous Art & Nature', description:'Explore indigenous art, culture, nature, and visual storytelling through an interactive web experience.', tags:['Art','Culture','Nature','Education','Web'], icon:'🌿', image:'Gemini_Generated_Image_f72yx0f72yx0f72y.png', demo:'https://parthpantfrompython.github.io/Website/Home.html', source:'', featured:false },
  { title:'JARVIS Online', description:'AI Assistant Dashboard with Voice, Chat & PC Control.', tags:['AI','Assistant','Voice','Chat','Dashboard'], icon:'JX', image:'Gemini_Generated_Image_zbt2ejzbt2ejzbt2.png', demo:'https://jarvisforos.lovable.app/', source:'', featured:false },
  { title:'Kids Needs Store', description:'🧸 A cheerful kids-focused online store experience for little things and big joy.', tags:['Ecommerce','Kids','Shopping','Replit','Web'], icon:'🛍️', image:'Gemini_Generated_Image_f72yx0f72yx0f72y.png', demo:'https://kids-store--parthpant.replit.app/', source:'', featured:false }
];

(function logicNestProjectSync(){
  const cfg=window.LOGIC_NEST_SUPABASE;
  if(!cfg) return;
  const script=document.createElement('script');
  script.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  script.onload=async()=>{
    try{
      const sb=supabase.createClient(cfg.url,cfg.publishableKey);
      const {data,error}=await sb.from('projects').select('*').eq('published',true).order('created_at',{ascending:true});
      if(error||!Array.isArray(data)||!data.length) return;
      window.logicNestProjects=data.map(p=>({title:p.title,description:p.description,tags:p.tags||[],icon:p.icon||'LN',image:p.image_url||'',demo:p.demo_url||'',source:p.source_url||'',featured:!!p.featured}));
      document.dispatchEvent(new CustomEvent('logicNestProjectsReady'));
    }catch(_){ }
  };
  document.head.appendChild(script);
})();

(function wireLogicNestYouTube(){
  const channel='https://www.youtube.com/@Logic-Nest-26';
  document.querySelectorAll('a[href*="youtube.com/"]').forEach(a=>{a.href=channel;a.target='_blank';a.rel='noreferrer';});
})();

(function refineLogicNestProjects(){
  const style=document.createElement('style');
  style.textContent=`
    .project{position:relative;overflow:hidden}
    .project::after{content:'';position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,.04) 42%,transparent 60%);transform:translateX(-120%);transition:transform .7s ease}
    .project:hover::after{transform:translateX(120%)}
    .ln-featured{position:absolute;top:12px;right:12px;z-index:3;padding:6px 9px;border-radius:999px;background:color-mix(in srgb,var(--accent) 18%,var(--panel));border:1px solid color-mix(in srgb,var(--accent) 38%,var(--line));color:var(--accent);font:900 10px/1 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(8px)}
    .ln-project-reveal{opacity:0;transform:translateY(12px);transition:opacity .45s ease,transform .45s ease}
    .ln-project-reveal.is-visible{opacity:1;transform:none}
  `;
  document.head.appendChild(style);
  const decorate=()=>{
    const grid=document.getElementById('projectGrid'); if(!grid) return;
    const cards=[...grid.querySelectorAll('.project')];
    const source=Array.isArray(window.logicNestProjects)?window.logicNestProjects:[];
    cards.forEach((card,i)=>{
      const title=(card.querySelector('h3')?.textContent||'').trim();
      const item=source.find(p=>p.title===title)||source[i];
      if(item?.featured&&!card.querySelector('.ln-featured')){const badge=document.createElement('span');badge.className='ln-featured';badge.textContent='Featured';card.appendChild(badge)}
      card.classList.add('ln-project-reveal'); setTimeout(()=>card.classList.add('is-visible'),Math.min(i,8)*55);
    });
  };
  const boot=()=>{const grid=document.getElementById('projectGrid');if(!grid)return;new MutationObserver(decorate).observe(grid,{childList:true,subtree:true});decorate()};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
