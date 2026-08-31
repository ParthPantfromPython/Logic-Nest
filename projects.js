window.logicNestProjects = [
  { title:'Nexus AI', description:'Home Command Center — an AI-powered dashboard and productivity workspace.', tags:['AI','Dashboard','Web','Productivity'], icon:'NX', image:'Gemini_Generated_Image_zbt2ejzbt2ejzbt2.png', demo:'https://career-with-nexus-ai.lovable.app/home', source:'' },
  { title:'Interactive Periodic Table', description:'🌈 Modern chemistry explorer with an interactive periodic table experience.', tags:['Chemistry','Education','Interactive','JavaScript'], icon:'🧪', image:'Gemini_Generated_Image_f72yx0f72yx0f72y.png', demo:'https://parthpantfrompython.github.io/Website/index.html', source:'' }
];

(function logicNestEnhancements(){
  const cfg=window.LOGIC_NEST_SUPABASE;
  const root=document.documentElement;
  const key='logicNestTheme';
  const prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved=localStorage.getItem(key);
  const initial=saved|| (prefersDark?'dark':'light');
  root.setAttribute('data-theme',initial);

  const style=document.createElement('style');
  style.textContent=`
    :root{color-scheme:dark;--ln-bg:#050b14;--ln-panel:#0d1a2b;--ln-text:#f5f8ff;--ln-muted:#9fb2c8;--ln-line:rgba(255,255,255,.10);--ln-accent:#69e7c9;--ln-accent2:#7aaeff}
    :root[data-theme="light"]{color-scheme:light;--ln-bg:#f5f8fc;--ln-panel:#ffffff;--ln-text:#112033;--ln-muted:#5f7083;--ln-line:rgba(17,32,51,.12);--ln-accent:#087f6b;--ln-accent2:#306fc1}
    body{transition:background .25s ease,color .25s ease}
    .logic-theme-toggle{position:fixed;right:20px;top:92px;z-index:80;display:inline-flex;align-items:center;gap:9px;padding:9px 12px;border:1px solid var(--ln-line);border-radius:999px;background:color-mix(in srgb,var(--ln-panel) 88%,transparent);color:var(--ln-text);box-shadow:0 12px 35px rgba(0,0,0,.16);backdrop-filter:blur(14px);font:800 12px/1 system-ui,sans-serif;cursor:pointer;transition:.2s}
    .logic-theme-toggle:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--ln-accent) 45%,var(--ln-line))}
    .logic-theme-dot{width:19px;height:19px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--ln-accent),var(--ln-accent2));color:#061019;font-size:11px}
    :root[data-theme="light"] body{background:radial-gradient(circle at 5% 0,rgba(48,111,193,.10),transparent 30%),radial-gradient(circle at 95% 10%,rgba(8,127,107,.09),transparent 28%),linear-gradient(180deg,#f8fbff,#eef4fa 60%,#f7fafc);color:var(--ln-text)}
    :root[data-theme="light"] .nav{background:rgba(248,251,255,.78);border-color:var(--ln-line)}
    :root[data-theme="light"] .navlinks{color:#4a5c70}
    :root[data-theme="light"] .card,:root[data-theme="light"] .project{background:rgba(255,255,255,.86);border-color:var(--ln-line);box-shadow:0 16px 42px rgba(30,55,80,.08)}
    :root[data-theme="light"] .heroArt{background:linear-gradient(145deg,#eaf0f7,#dfe8f2);border-color:var(--ln-line);box-shadow:0 28px 70px rgba(32,55,79,.12)}
    :root[data-theme="light"] .terminal{background:rgba(248,251,255,.82);border-color:rgba(17,32,51,.12)}
    :root[data-theme="light"] .projectVisual{background:linear-gradient(135deg,#edf3f8,#dde8f2)}
    :root[data-theme="light"] .search,:root[data-theme="light"] .filter,:root[data-theme="light"] .btn.ghost{background:rgba(17,32,51,.035);color:var(--ln-text)}
    :root[data-theme="light"] .projectLink{color:#29445d}
    :root[data-theme="light"] .callout{background:rgba(255,255,255,.72);border-color:rgba(8,127,107,.16)}
    :root[data-theme="light"] footer{border-color:var(--ln-line);color:#617286}
    @media(max-width:620px){.logic-theme-toggle{top:auto;bottom:74px;right:16px}}
  `;
  document.head.appendChild(style);

  const toggle=document.createElement('button');
  toggle.className='logic-theme-toggle';
  toggle.type='button';
  toggle.setAttribute('aria-label','Toggle light and dark theme');
  const updateToggle=()=>{const dark=root.getAttribute('data-theme')!=='light';toggle.innerHTML=`<span class="logic-theme-dot">${dark?'☀':'☾'}</span><span>${dark?'Light mode':'Dark mode'}</span>`};
  toggle.addEventListener('click',()=>{const next=root.getAttribute('data-theme')==='light'?'dark':'light';root.setAttribute('data-theme',next);localStorage.setItem(key,next);updateToggle()});
  document.body.appendChild(toggle);
  updateToggle();

  const sync=()=>{
    if(!cfg)return;
    const script=document.createElement('script');
    script.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload=async()=>{
      try{
        const sb=supabase.createClient(cfg.url,cfg.publishableKey);
        const {data,error}=await sb.from('projects').select('*').eq('published',true).order('created_at',{ascending:true});
        if(error||!Array.isArray(data)||!data.length)return;
        window.logicNestProjects=data.map(p=>({title:p.title,description:p.description,tags:p.tags||[],icon:p.icon||'LN',image:p.image_url||'',demo:p.demo_url||'',source:p.source_url||''}));
        document.dispatchEvent(new CustomEvent('logicNestProjectsReady'));
      }catch(_){ }
    };
    document.head.appendChild(script);
  };
  sync();
})();
