async function loadContent(){
  const d = await fetch('content.json').then(r => r.json());

  const set = (id, value) => {
    const e = document.getElementById(id);
    if (e) e.textContent = value ?? '';
  };

  const event = d.event;
  const tickets = d.tickets;
  const artist = d.artistAlley;
  const gettingThere = d.gettingThere;
  const bumpIn = d.bumpIn;

  set('tagline', event.tagline);
  set('eventName', event.name);
  set('eventDate', event.date);
  set('venue', event.venue);
  set('salesEnd', `Online sales end ${tickets.salesEnd}`);
  set('salesEnd2', tickets.salesEnd);
  set('aboutText', event.description);
  set('address1', gettingThere.address);
  set('footerDate', event.date);
  set('footerVenue', event.venue);
  set('footerEmail', d.contact?.email || '');
  set('year', new Date().getFullYear());

  const ticketButton = document.getElementById('ticketButton');
  if (ticketButton) {
    ticketButton.href = tickets.eventbriteUrl || '#tickets';
  }

  const artistButton = document.getElementById('artistButton');
  if (artistButton) {
    artistButton.href = artist.applicationUrl;
  }

  const mapLink = document.getElementById('mapLink');
  if (mapLink) {
    mapLink.href = gettingThere.mapUrl || '#';
  }

  const tl = document.getElementById('ticketList');
  if (tl) {
    tl.innerHTML = tickets.items.map((t, i) => `
      <div class="ticket-row">
        <span class="ticket-icon">${['◆','★','●'][i] || '◆'}</span>
        <div>
          <b>${escapeHtml(t.name)}</b>
          <strong>${escapeHtml(t.price)}</strong>
          <small>${escapeHtml(t.note)}${t.extra ? ' • ' + escapeHtml(t.extra) : ''}</small>
        </div>
      </div>
    `).join('');
  }

  const list = document.getElementById('scheduleList');

  const renderSchedule = (filter = 'All') => {
    if (!list) return;
    list.innerHTML = d.schedule
      .filter(x => filter === 'All' || x.type === filter)
      .map(x => `
        <div class="schedule-item">
          <div class="time">${escapeHtml(x.time)}</div>
          <div>
            <h4>${escapeHtml(x.title)}</h4>
            <p>⌖ ${escapeHtml(x.room)}</p>
          </div>
          <span class="tag">${escapeHtml(x.type)}</span>
        </div>
      `).join('');
  };

  renderSchedule();

  document.querySelectorAll('.tabs button').forEach(button => {
    button.onclick = () => {
      document.querySelectorAll('.tabs button').forEach(x => x.classList.remove('active'));
      button.classList.add('active');
      renderSchedule(button.dataset.filter);
    };
  });

  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.innerHTML = d.faq.map(item => `
      <div class="faq-item">
        <button class="faq-q">${escapeHtml(item.question)} <span>＋</span></button>
        <div class="faq-a">${escapeHtml(item.answer)}</div>
      </div>
    `).join('');

    document.querySelectorAll('.faq-q').forEach(q => {
      q.onclick = () => q.parentElement.classList.toggle('open');
    });
  }

  // Artist Alley content
  const artistCard = document.querySelector('#artist-alley');
  if (artistCard) {
    const p = artistCard.querySelector('p:nth-of-type(2)');
    if (p) p.textContent = artist.description;

    const ul = artistCard.querySelector('ul');
    if (ul && Array.isArray(artist.bullets)) {
      ul.innerHTML = artist.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    }
  }

  // Bump-in content
  const bumpCard = document.querySelector('#bump-in');
  if (bumpCard) {
    const paragraphs = bumpCard.querySelectorAll('p');
    if (paragraphs.length) paragraphs[paragraphs.length - 1].textContent = bumpIn.information;
  }

  // Add transport information to the existing Getting There card.
  const gettingCard = document.querySelector('#getting-there');
  if (gettingCard) {
    const paragraphs = gettingCard.querySelectorAll('p');
    if (paragraphs[1]) paragraphs[1].innerHTML = `<b>Train</b><br>${escapeHtml(gettingThere.train)}`;
    if (paragraphs[2]) paragraphs[2].innerHTML = `<b>Bus</b><br>${escapeHtml(gettingThere.bus)}`;
  }
}

function escapeHtml(value){
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#039;'
  }[ch]));
}

document.querySelector('.menu').onclick = () =>
  document.querySelector('nav').classList.toggle('open');

loadContent();
