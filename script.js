
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$('#mb').onclick=()=>$('nav').classList.toggle('open');
const ck=$('#ck');try{if(localStorage.getItem('ck'))ck.remove()}catch(e){}
$$('#ck button').forEach(b=>b.onclick=()=>{try{localStorage.setItem('ck','1')}catch(e){}ck.remove()});
$$('.tabs').forEach(t=>{const bs=$$('button',t),o=$('#eo');bs.forEach(b=>b.onclick=()=>{bs.forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#et').textContent=b.dataset.t;$('#ed').textContent=b.dataset.d;$('#ev').textContent=b.dataset.v})});
const f=$('#cf');if(f){const m=$('#msg'),c=$('#cc');m.oninput=()=>c.textContent=m.value.length;
const q=new URLSearchParams(location.search).get('service');if(q){const s=$('#svc');[...s.options].forEach(o=>{if(o.dataset.k==q)s.value=o.value})}
f.onsubmit=e=>{e.preventDefault();let ok=true;$$('.er',f).forEach(x=>x.style.display='none');
const chk=(id,t)=>{if(!t){$('#e-'+id).style.display='block';ok=false}};
chk('n',f.n.value.trim().length>1);chk('p',/^[6-9]\d{9}$/.test(f.p.value.trim()));chk('e',/^\S+@\S+\.\S+$/.test(f.e.value));chk('s',f.s.value);chk('m',f.m.value.trim().length>=20);chk('c',f.c.checked);
if(!ok)return;const b=`Name: ${f.n.value}\nMobile: +91 ${f.p.value}\nEmail: ${f.e.value}\nService: ${f.s.value}\n\n${f.m.value}`;
$('.ok').style.display='block';location.href='mailto:anand@rarconsultant.co.in?subject='+encodeURIComponent('Enquiry: '+f.s.value)+'&body='+encodeURIComponent(b)}}
