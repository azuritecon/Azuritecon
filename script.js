async function loadContent(){
 const d=await fetch('content.json').then(r=>r.json());
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
 set('tagline',d.tagline);set('eventName',d.eventName);set('eventDate',d.date);set('venue',d.venue);
 set('salesEnd',`Online sales end ${d.ticketSalesEnd}`);set('salesEnd2',d.ticketSalesEnd);
 set('aboutText',d.about);set('address1',d.venue);set('footerDate',d.date);set('footerVenue',d.venue);set('footerEmail',d.email);
 set('year',new Date().getFullYear());
 document.getElementById('ticketButton').href=d.eventbriteUrl;
 document.getElementById('artistButton').href=d.artistAlleyUrl;
 document.getElementById('mapLink').href=d.mapUrl;
 const tl=document.getElementById('ticketList');
 tl.innerHTML=d.tickets.map((t,i)=>`<div class="ticket-row"><span class="ticket-icon">${['◆','★','●'][i]}</span><div><b>${t.name}</b><strong>${t.price}</strong><small>${t.note}${t.extra?' • '+t.extra:''}</small></div></div>`).join('');
 const list=document.getElementById('scheduleList');
 const render=(f='All')=>list.innerHTML=d.schedule.filter(x=>f==='All'||x.type===f).map(x=>`<div class="schedule-item"><div class="time">${x.time}</div><div><h4>${x.title}</h4><p>⌖ ${x.room}</p></div><span class="tag">${x.type}</span></div>`).join('');
 render();
 document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)});
 document.getElementById('faqList').innerHTML=d.faqs.map(f=>`<div class="faq-item"><button class="faq-q">${f[0]} <span>＋</span></button><div class="faq-a">${f[1]}</div></div>`).join('');
 document.querySelectorAll('.faq-q').forEach(q=>q.onclick=()=>q.parentElement.classList.toggle('open'));
}
document.querySelector('.menu').onclick=()=>document.querySelector('nav').classList.toggle('open');
loadContent();
