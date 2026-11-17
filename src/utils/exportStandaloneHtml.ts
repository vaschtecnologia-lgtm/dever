import type { Property } from '../types';

const UNSPLASH_FALLBACK_POOL = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
];

function mapPhotosToPublicUrls(photos: string[], seedIndex: number): string[] {
  return photos.map((url, idx) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return UNSPLASH_FALLBACK_POOL[(seedIndex + idx) % UNSPLASH_FALLBACK_POOL.length];
  });
}

export function buildStandaloneHtml(properties: Property[], adminPass: string): string {
  const exportedProps = properties.map((p, idx) => ({
    ...p,
    photos: mapPhotosToPublicUrls(p.photos, idx),
  }));

  const jsonSafe = JSON.stringify(exportedProps).replace(/</g, '\\u003c');
  const passSafe = JSON.stringify(adminPass).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Déver Resende | CRECI-DF 30584 — Imóveis Taguatinga/DF</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:radial-gradient(ellipse 85% 65% at 50% 22%,#dbeafe 0%,#eff6ff 50%,#f8fafc 100%);color:#18181b;overflow-x:hidden;padding-top:58px}
  .watermark{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.14}
  .container{max-width:1120px;margin:0 auto;padding:0 16px;position:relative;z-index:1}
  header{position:fixed;top:0;left:0;right:0;height:58px;background:#0b0a63;border-bottom:1px solid #1d1b8a;z-index:40}
  .header-in{max-width:1120px;height:100%;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between;gap:16px}
  .brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff;font-weight:700;font-size:18px;white-space:nowrap}
  .nav{display:flex;align-items:center;gap:14px;font-size:13px;font-weight:600}
  .nav a,.nav button{background:none;border:none;color:#dbeafe;cursor:pointer;text-decoration:none;font-size:13px;font-weight:600;white-space:nowrap}
  .btn{height:38px;padding:0 16px;border-radius:8px;border:none;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;text-decoration:none;white-space:nowrap}
  .btn-orange{background:#e06d22;color:#fff}.btn-orange:hover{background:#c85a14}
  .btn-ghost{background:#fff;border:1px solid #cbd5e1;color:#0b0a63}.btn-ghost:hover{background:#0b0a63;color:#fff}
  .hero{min-height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px 16px;border-bottom:1px solid #1d1b8a;background:#0b0a63;color:#fff}
  .hero h1{font-size:clamp(28px,4vw,42px);margin:8px 0 10px;line-height:1.15;color:#fff}
  .hero p{color:#dbeafe;max-width:560px;margin-bottom:18px;font-size:15px}
  .box{background:rgba(255,255,255,.95);border:1px solid rgba(11,10,99,.15);border-radius:12px;padding:16px;margin:20px auto}
  .quick{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #e2e8f0}
  .qbtn{height:34px;padding:0 12px;border-radius:8px;border:none;background:#eef3fa;color:#0b0a63;font-size:12px;font-weight:600;cursor:pointer}
  .qbtn.active{background:#0b0a63;color:#fff}
  .filters{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}
  .filters input,.filters select{height:38px;padding:0 10px;border:1px solid rgba(11,10,99,.15);border-radius:8px;font-size:13px;background:#f6f9fe;width:100%}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;margin-bottom:28px}
  .card{background:rgba(255,255,255,.96);border:1px solid rgba(11,10,99,.15);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;text-align:center;transition:transform .2s,box-shadow .2s}
  .card:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(11,10,99,.12)}
  .card-img{position:relative;height:180px;background:#ddd}
  .card-img img{width:100%;height:180px;object-fit:cover;display:block;background:#ddd}
  .fav-btn{position:absolute;top:10px;right:10px;width:34px;height:34px;border-radius:50%;border:none;background:rgba(255,255,255,.92);cursor:pointer;font-size:16px}
  .card-body{padding:14px;display:flex;flex-direction:column;gap:8px;flex:1;justify-content:space-between}
  .price{font-size:18px;font-weight:700;color:#e06d22}
  .card-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}
  .modal-bg{position:fixed;inset:0;background:rgba(7,6,61,.75);display:none;align-items:center;justify-content:center;padding:16px;z-index:60}
  .modal-bg.open{display:flex}
  .modal{background:#fff;border-radius:12px;max-width:640px;width:100%;max-height:92vh;overflow-y:auto;padding:18px;position:relative}
  .chips{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:8px 0 12px}
  .chip{height:38px;border-radius:8px;border:1px solid rgba(11,10,99,.15);background:#f6f9fe;font-weight:600;font-size:12px;color:#0b0a63;cursor:pointer}
  .chip.active{background:#e06d22;color:#fff;border-color:#e06d22}
  .thumbs{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin:10px 0}
  .thumbs img{width:100%;height:52px;object-fit:cover;display:block;background:#ddd;border-radius:6px;cursor:pointer;border:2px solid transparent}
  .thumbs img.active{border-color:#e06d22}
  footer{text-align:center;padding:24px 16px;border-top:1px solid #1d1b8a;color:#fac7a4;font-size:12px;background:#0b0a63}
</style>
</head>
<body>
<svg class="watermark" viewBox="0 0 1200 760" fill="none"><g stroke="#0b0a63" stroke-width="2.2"><path d="M70 555H1130"/><path d="M170 305L565 185L945 278V385H170V305Z" fill="#0b0a63" fill-opacity="0.16"/><path d="M125 312L565 172L995 276" stroke-width="4"/><rect x="235" y="385" width="575" height="170" fill="#1d4ed8" fill-opacity="0.12"/><rect x="810" y="350" width="235" height="205" fill="#0b0a63" fill-opacity="0.1"/><path d="M190 555H765L715 655H140L190 555Z" fill="#0284c7" fill-opacity="0.18"/></g></svg>
<header>
  <div class="header-in">
    <a class="brand" href="#">
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none"><rect x="2" y="2" width="32" height="32" rx="6" fill="#0b0a63"/><path d="M8.5 18.5L18 10.5L27.5 18.5" stroke="#E06D22" stroke-width="2.5" stroke-linecap="round"/><path d="M11.5 16.5V25.5H24.5V16.5" stroke="#E06D22" stroke-width="2.2"/><path d="M18 25V17H22" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      <span>Déver Resende</span>
    </a>
    <nav class="nav">
      <a href="#catalogo">Imóveis</a>
      <button type="button" onclick="setQuick('favoritos')">Favoritos (<span id="favCount">0</span>)</button>
      <a href="#contato">Informações</a>
      <button type="button" onclick="openAdmin()">Admin</button>
    </nav>
  </div>
</header>
<section class="hero">
  <div style="font-size:12px;color:#fac7a4;font-weight:600">Déver Resende · Corretor e Perito Avaliador de Imóveis · CRECI-DF 30584 · Taguatinga/DF</div>
  <h1>Imóveis Selecionados em Brasília e Taguatinga</h1>
  <p>Atendimento direto pelo WhatsApp (61) 99973-8646. Escolha o imóvel ideal e agende sua visita acompanhada.</p>
  <a class="btn btn-orange" href="#catalogo">Explorar imóveis</a>
</section>
<main class="container" id="catalogo">
  <div class="box">
    <div class="quick" id="quickFilters"></div>
    <div class="filters">
      <input id="fSearch" placeholder="Buscar por título ou bairro..." oninput="render()" />
      <select id="fType" onchange="render()"><option value="todos">Tipo: Todos</option><option>Casa</option><option>Apartamento</option><option>Kitnet</option><option>Cobertura</option></select>
      <select id="fBeds" onchange="render()"><option value="todos">Quartos: Todos</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select>
      <select id="fSort" onchange="render()"><option value="featured">Destaques</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option><option value="area-desc">Maior área</option></select>
    </div>
  </div>
  <div class="grid" id="grid"></div>
  <section id="contato" class="box" style="max-width:640px;text-align:center">
    <h2 style="margin-bottom:6px">Solicitar Informações</h2>
    <p style="font-size:13px;color:#52525b;margin-bottom:14px">Déver Resende · CRECI-DF 30584 · WhatsApp (61) 99973-8646</p>
    <form onsubmit="sendInfo(event)" style="display:grid;gap:10px">
      <input id="cName" required placeholder="Seu nome" style="height:38px;padding:0 12px;border:1px solid #e4e4e7;border-radius:8px" />
      <input id="cPhone" required placeholder="Seu WhatsApp" style="height:38px;padding:0 12px;border:1px solid #e4e4e7;border-radius:8px" />
      <textarea id="cMsg" rows="3" placeholder="Sua mensagem..." style="padding:10px 12px;border:1px solid #e4e4e7;border-radius:8px"></textarea>
      <button type="submit" class="btn btn-orange">Enviar via WhatsApp</button>
    </form>
  </section>
</main>
<div class="modal-bg" id="galModal" onclick="closeModals()"><div class="modal" onclick="event.stopPropagation()" id="galBody"></div></div>
<div class="modal-bg" id="schModal" onclick="closeModals()"><div class="modal" onclick="event.stopPropagation()" id="schBody"></div></div>
<div class="modal-bg" id="admModal" onclick="closeModals()"><div class="modal" onclick="event.stopPropagation()" id="admBody"></div></div>
<footer>Déver Resende · CRECI-DF 30584 · Taguatinga/DF · WhatsApp (61) 99973-8646</footer>
<script>
const FALLBACK="${UNSPLASH_FALLBACK_POOL[0]}";
const INITIAL=${jsonSafe};
let ADMIN_PASS=localStorage.getItem('dever_admin_pass')||${passSafe};
let props=JSON.parse(localStorage.getItem('dever_props')||'null')||INITIAL;
let favs=JSON.parse(localStorage.getItem('dever_favs')||'[]');
let quick='todos', selTime='10:00';
const fmt=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(v);
function setQuick(q){quick=q;render();}
function toggleFav(id){const sid=String(id);favs=favs.includes(sid)?favs.filter(x=>x!==sid):[...favs,sid];localStorage.setItem('dever_favs',JSON.stringify(favs));render();}
function render(){
  document.getElementById('favCount').textContent=favs.length;
  const qBtns=[['todos','Todos '+props.length],['Alto','Alto '+props.filter(x=>x.tier==='Alto').length],['Médio','Médio '+props.filter(x=>x.tier==='Médio').length],['Baixo','Baixo '+props.filter(x=>x.tier==='Baixo').length],['Kitnet','Kitnets'],['Casa','Casas'],['Apartamento','Apartamentos'],['favoritos','Favoritos ('+favs.length+')']];
  document.getElementById('quickFilters').innerHTML=qBtns.map(([k,l])=>'<button class="qbtn '+(quick===k?'active':'')+'" onclick="setQuick(\\''+k+'\\')">'+l+'</button>').join('');
  const s=(document.getElementById('fSearch').value||'').toLowerCase();
  const t=document.getElementById('fType').value;
  const b=document.getElementById('fBeds').value;
  const sort=document.getElementById('fSort').value;
  let list=props.filter(p=>{
    if(quick==='Alto'||quick==='Médio'||quick==='Baixo'){if(p.tier!==quick)return false;}
    else if(quick==='Kitnet'||quick==='Casa'||quick==='Apartamento'){if(p.type!==quick)return false;}
    else if(quick==='favoritos'){if(!favs.includes(String(p.id)))return false;}
    if(s && !(p.title+' '+p.neighborhood+' '+p.description).toLowerCase().includes(s))return false;
    if(t!=='todos' && p.type!==t)return false;
    if(b!=='todos' && p.bedrooms<Number(b))return false;
    return true;
  });
  if(sort==='price-asc')list.sort((a,b)=>a.price-b.price);
  if(sort==='price-desc')list.sort((a,b)=>b.price-a.price);
  if(sort==='area-desc')list.sort((a,b)=>b.areaPrivativa-a.areaPrivativa);
  document.getElementById('grid').innerHTML=list.map(p=>{
    const isF=favs.includes(String(p.id));
    return '<article class="card"><div class="card-img"><img src="'+(p.photos[0]||FALLBACK)+'" loading="eager" referrerpolicy="no-referrer" onerror="this.src=FALLBACK" onclick="openGal(\\''+p.id+'\\')" /><button class="fav-btn" onclick="toggleFav(\\''+p.id+'\\')">'+(isF?'❤️':'🤍')+'</button></div><div class="card-body"><div><div style="font-size:11px;color:#71717a">'+p.tier+' · '+p.type+' · '+p.neighborhood+'</div><h3 style="margin:4px 0">'+p.title+'</h3><div class="price">'+fmt(p.price)+'</div><div style="font-size:12px;color:#52525b">'+p.bedrooms+' qts · '+p.areaPrivativa+'m² priv / '+p.areaTotal+'m² tot</div></div><div class="card-actions"><button class="btn btn-ghost" onclick="openGal(\\''+p.id+'\\')">Ver fotos</button><button class="btn btn-orange" onclick="openSch(\\''+p.id+'\\')">Agendar visita</button></div></div></article>';
  }).join('');
}
function closeModals(){document.querySelectorAll('.modal-bg').forEach(m=>m.classList.remove('open'));}
function openGal(id){
  const p=props.find(x=>String(x.id)===String(id)); if(!p)return;
  const photos=p.photos.length?p.photos:[FALLBACK];
  document.getElementById('galBody').innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><h3>'+p.title+'</h3><button class="btn btn-ghost" onclick="closeModals()">Fechar</button></div><img id="mainGalImg" src="'+photos[0]+'" style="width:100%;height:220px;object-fit:cover;display:block;background:#ddd;border-radius:8px" loading="eager" referrerpolicy="no-referrer" onerror="this.src=FALLBACK" /><div class="thumbs">'+photos.map((u,i)=>'<img src="'+u+'" class="'+(i===0?'active':'')+'" loading="eager" referrerpolicy="no-referrer" onerror="this.src=FALLBACK" onclick="document.getElementById(\\'mainGalImg\\').src=this.src" />').join('')+'</div><p style="text-align:center;margin:8px 0"><strong style="color:#ea580c;font-size:20px">'+fmt(p.price)+'</strong><br><span style="font-size:13px;color:#52525b">'+p.neighborhood+', '+p.city+' · '+p.areaPrivativa+'m² priv / '+p.areaTotal+'m² total</span></p><p style="text-align:center;font-size:13px;color:#52525b;margin-bottom:12px">'+p.description+'</p><button class="btn btn-orange" style="width:100%" onclick="closeModals();openSch(\\''+p.id+'\\')">Agendar visita deste imóvel</button>';
  document.getElementById('galModal').classList.add('open');
}
function openSch(id){
  const p=props.find(x=>String(x.id)===String(id)); if(!p)return;
  const today=new Date().toISOString().split('T')[0];
  selTime='10:00';
  const slots=['09:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00'];
  document.getElementById('schBody').innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><h3>Agendar Visita</h3><button class="btn btn-ghost" onclick="closeModals()">Fechar</button></div><img src="'+(p.photos[0]||FALLBACK)+'" style="width:100%;height:220px;object-fit:cover;display:block;background:#ddd;border-radius:8px" loading="eager" referrerpolicy="no-referrer" onerror="this.src=FALLBACK" /><div style="text-align:center;margin:10px 0"><h4>'+p.title+'</h4><div class="price">'+fmt(p.price)+'</div><div style="font-size:12px;color:#52525b">'+p.neighborhood+', '+p.city+'</div></div><form onsubmit="confirmSch(event,\\''+p.id+'\\')" style="display:grid;gap:10px"><input id="schDate" type="date" min="'+today+'" value="'+today+'" required onclick="this.showPicker&&this.showPicker()" style="height:38px;padding:0 10px;border:1px solid #e4e4e7;border-radius:8px" /><div class="chips">'+slots.map(s=>'<button type="button" class="chip '+(s===selTime?'active':'')+'" onclick="pickTime(this,\\''+s+'\\')">'+s+'</button>').join('')+'</div><input id="schName" required placeholder="Seu nome" style="height:38px;padding:0 10px;border:1px solid #e4e4e7;border-radius:8px" /><input id="schPhone" required placeholder="Seu WhatsApp" style="height:38px;padding:0 10px;border:1px solid #e4e4e7;border-radius:8px" /><button type="submit" class="btn btn-orange">Confirmar agendamento</button></form>';
  document.getElementById('schModal').classList.add('open');
}
function pickTime(el,t){selTime=t;document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');}
function confirmSch(e,id){
  e.preventDefault();
  const p=props.find(x=>String(x.id)===String(id)); if(!p)return;
  const d=document.getElementById('schDate').value.split('-').reverse().join('/');
  const n=document.getElementById('schName').value;
  const w=document.getElementById('schPhone').value;
  const txt='Olá Déver Resende!\\nImóvel: '+p.title+'\\nPreço: '+fmt(p.price)+'\\nLocal: '+p.neighborhood+', '+p.city+'\\nDia: '+d+'\\nHorário: '+selTime+'\\nNome: '+n+'\\nWhatsApp: '+w+'\\nVisita somente acompanhada pelo corretor.';
  window.open('https://api.whatsapp.com/send?phone=5561999738646&text='+encodeURIComponent(txt),'_blank');
}
function sendInfo(e){
  e.preventDefault();
  const txt='Contato pelo site:\\nNome: '+document.getElementById('cName').value+'\\nWhatsApp: '+document.getElementById('cPhone').value+'\\nMensagem: '+document.getElementById('cMsg').value;
  window.open('https://api.whatsapp.com/send?phone=5561999738646&text='+encodeURIComponent(txt),'_blank');
}
function openAdmin(){
  document.getElementById('admBody').innerHTML='<h3>Painel Admin</h3><p style="font-size:12px;color:#52525b;margin:6px 0 12px">Digite a senha (padrão 1808)</p><input id="admPass" type="password" placeholder="Senha" style="height:38px;padding:0 10px;border:1px solid #e4e4e7;border-radius:8px;width:100%;margin-bottom:10px" /><button class="btn btn-orange" onclick="checkAdm()">Entrar</button>';
  document.getElementById('admModal').classList.add('open');
}
function checkAdm(){
  if(document.getElementById('admPass').value!==ADMIN_PASS)return;
  document.getElementById('admBody').innerHTML='<h3>Administração ('+props.length+' imóveis)</h3><p style="font-size:12px;margin:8px 0">Trocar senha:</p><div style="display:flex;gap:8px;margin-bottom:12px"><input id="newPass" placeholder="Nova senha" style="height:38px;padding:0 10px;border:1px solid #e4e4e7;border-radius:8px;flex:1" /><button class="btn btn-orange" onclick="ADMIN_PASS=document.getElementById(\\'newPass\\').value||ADMIN_PASS;localStorage.setItem(\\'dever_admin_pass\\',ADMIN_PASS);closeModals()">Salvar</button></div><button class="btn btn-ghost" onclick="localStorage.removeItem(\\'dever_props\\');props=INITIAL;render();closeModals()">Restaurar 18 imóveis</button>';
}
render();
</script>
</body>
</html>`;
}
