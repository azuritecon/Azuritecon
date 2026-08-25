async function loadContent() {
  const response = await fetch('content.json');
  if (!response.ok) throw new Error('Could not load content.json');
  return response.json();
}

const $ = (selector) => document.querySelector(selector);

function text(selector, value) {
  const el = $(selector);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

function link(selector, url) {
  const el = $(selector);
  if (el && url) {
    el.href = url;
    el.target = '_blank';
    el.rel = 'noopener';
  }
}

function render(data) {
  document.title = data.event.name;

  text('[data-event="name"]', data.event.name);
  text('[data-event="tagline"]', data.event.tagline);
  text('[data-event="date"]', data.event.date);
  text('[data-event="venue"]', data.event.venue);
  text('[data-event="description"]', data.event.description);

  text('[data-ticket="sales-end"]', data.tickets.salesEnd);
  text('[data-ticket="market-online"]', data.tickets.marketEntry.online);
  text('[data-ticket="market-day"]', data.tickets.marketEntry.onTheDay);
  text('[data-ticket="saturday-price"]', data.tickets.saturdayMarketPanelsPerformances.online);
  text('[data-ticket="saturday-availability"]', data.tickets.saturdayMarketPanelsPerformances.availability);
  text('[data-ticket="kids-price"]', data.tickets.children12AndUnder.price);
  text('[data-ticket="kids-availability"]', data.tickets.children12AndUnder.availability);

  text('[data-artist="info"]', data.artistAlley.information);
  link('[data-artist="application"]', data.artistAlley.applicationUrl);

  text('[data-getting-there="address"]', data.gettingThere.address);
  text('[data-getting-there="transport"]', data.gettingThere.publicTransport);
  text('[data-getting-there="parking"]', data.gettingThere.parking);
  text('[data-getting-there="accessibility"]', data.gettingThere.accessibility);

  text('[data-bump-in="info"]', data.bumpIn.information);

  const schedule = $('[data-schedule]');
  if (schedule) {
    schedule.innerHTML = '';
    data.schedule.forEach(item => {
      const article = document.createElement('article');
      article.className = 'schedule-item';
      article.innerHTML = `<div class="schedule-meta">${escapeHtml(item.day)} · ${escapeHtml(item.time)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <span>${escapeHtml(item.location)}</span>`;
      schedule.appendChild(article);
    });
  }

  const faq = $('[data-faq]');
  if (faq) {
    faq.innerHTML = '';
    data.faq.forEach(item => {
      const details = document.createElement('details');
      details.innerHTML = `<summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p>`;
      faq.appendChild(details);
    });
  }

  link('[data-ticket="eventbrite"]', data.tickets.eventbriteUrl);
  text('[data-contact="email"]', data.contact.email);
  link('[data-social="instagram"]', data.contact.socialLinks.instagram);
  link('[data-social="facebook"]', data.contact.socialLinks.facebook);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[ch]));
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await loadContent();
    render(data);
  } catch (error) {
    console.error(error);
  }
});
