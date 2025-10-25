// script.js
// Loads a Markdown file, renders it, and replaces <event> tags
// with a styled card (title + date/location table).

const contentEl = document.getElementById('content');

// Fetch and render a Markdown file
async function loadMarkdown(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Failed to load ' + path + ': ' + res.statusText);
    const md = await res.text();

    // Convert Markdown to HTML
    const html = marked.parse(md);
    contentEl.innerHTML = html;

    // Process custom <event> tags
    processEventTags();
  } catch (err) {
    contentEl.innerHTML = `<p style="color:darkred">Error loading file: ${err.message}</p>`;
  }
}

// Replace <event> tags with template cards
function processEventTags() {
  const eventEls = Array.from(document.getElementsByTagName('event'));

  eventEls.forEach(ev => {
    const nameAttr = ev.getAttribute('name');
    const rawName = (nameAttr && nameAttr.trim()) ? nameAttr.trim() : ev.textContent.trim();
    const title = rawName || 'Unnamed Event';

    const card = document.createElement('div');
    card.className = 'event-card';

    const h2 = document.createElement('h2');
    h2.textContent = title;
    card.appendChild(h2);

    // Create 2×2 table
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    const r1 = document.createElement('tr');
    r1.innerHTML = '<td>date</td><td></td>';

    const r2 = document.createElement('tr');
    r2.innerHTML = '<td>location</td><td></td>';

    tbody.appendChild(r1);
    tbody.appendChild(r2);
    table.appendChild(tbody);
    card.appendChild(table);

    ev.parentNode.replaceChild(card, ev);
  });
}

// Navigation link handling
document.querySelectorAll('.note-link').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const file = a.getAttribute('data-file');
    loadMarkdown(file);
  });
});

// Load default note
loadMarkdown('notes/session1.md');
