window.logicNestProjects = [
  { title:'Nexus AI', description:'Home Command Center — an AI-powered dashboard and productivity workspace.', tags:['AI','Dashboard','Web','Productivity'], icon:'NX', image:'Gemini_Generated_Image_zbt2ejzbt2ejzbt2.png', demo:'https://career-with-nexus-ai.lovable.app/home', source:'' },
  { title:'Interactive Periodic Table', description:'🌈 Modern chemistry explorer with an interactive periodic table experience.', tags:['Chemistry','Education','Interactive','JavaScript'], icon:'🧪', image:'Gemini_Generated_Image_f72yx0f72yx0f72y.png', demo:'https://parthpantfrompython.github.io/Website/index.html', source:'' },
  { title:'Indigenous Art & Nature', description:'Explore indigenous art, culture, nature, and visual storytelling through an interactive web experience.', tags:['Art','Culture','Nature','Education','Web'], icon:'🌿', image:'Gemini_Generated_Image_f72yx0f72yx0f72y.png', demo:'https://parthpantfrompython.github.io/Website/Home.html', source:'' },
  { title:'JARVIS Online', description:'AI Assistant Dashboard with Voice, Chat & PC Control.', tags:['AI','Assistant','Voice','Chat','Dashboard'], icon:'JX', image:'Gemini_Generated_Image_zbt2ejzbt2ejzbt2.png', demo:'https://jarvisforos.lovable.app/', source:'' }
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
      window.logicNestProjects=data.map(p=>({title:p.title,description:p.description,tags:p.tags||[],icon:p.icon||'LN',image:p.image_url||'',demo:p.demo_url||'',source:p.source_url||''}));
      document.dispatchEvent(new CustomEvent('logicNestProjectsReady'));
    }catch(_){ }
  };
  document.head.appendChild(script);
})();

// Keep public YouTube buttons connected to the official Logic Nest channel.
(function wireLogicNestYouTube(){
  const channel='https://www.youtube.com/@Logic-Nest-26';
  const wire=()=>document.querySelectorAll('a[href*="youtube.com/"]').forEach(a=>{a.href=channel;a.target='_blank';a.rel='noreferrer';});
  wire();
  new MutationObserver(wire).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['href']});
})();
