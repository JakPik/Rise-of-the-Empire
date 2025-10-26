// script.js
// Loads a Markdown file, renders it, and replaces <event> tags
// with a styled card (title + date/location table).

const contentEl = document.getElementById('content');

const markdownPages = {
  session1: `
# Ukázky zobrazení a zápisu jednotlivých poznámek
## NPC
<NPC name="František" img="frantisek.jpg" race="člověk" profession="Rytíř" age="28" location="Bronzová vesnice (může být odkaz)" info="Zajímamvé informace of Františkovy" description="Popis Františka, jak vypadá, co má za charakteristcké vlastnosti, např. jizva pod okem" tasks="Seznam úkolů, ukol, ukazka"></NPC>



# Oblast / území
<Location
list="Seznam měst, vesnic a oblastí, např. Bronzová vesnice, Maják duchů, Stříbrné město"
info="Popis kraje"
></Location>
# Session 1 — Highvale

Welcome to the campaign!

<event>Festival of Blades</event>

Some other intro text.

You can also use the attribute form:

<event name="Midnight Masquerade"></event>
`,
  session2: `
# Session 2 — Darkwood

The heroes enter Darkwood forest.

<event>Midnight Masquerade</event>
`
};

const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

// Fetch and render a Markdown file
function loadMarkdownPageLocal(pageId) {
  const md = markdownPages[pageId];
  contentEl.innerHTML = marked.parse(md);
  processEventTags(); // handle <event> tags
  processNPCTags();
}

async function loadMarkdownPage(pageId) {
  try {
    const rest = await fetch('notes/${pageId}.md')
    if (!rest.ok) throw new Error('Failed to fetch: ' + rest.status);
    const md = await rest.text();
    contentEl.innerHTML = marked.parse(md);
    processEventTags();
    processNPCTags();
  }
  catch (err) {
    contentEl.innerHTML = '<p>Error loading page: ' + err.message + '</p>';
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


function processNPCTags() {
  const tags = Array.from(document.getElementsByTagName('NPC'));

  tags.forEach(tag => {
    const rawName = tag.getAttribute('name');
    const title = rawName || 'Unnamed Event';

    const card = document.createElement('div');
    
    const header = document.createElement('div');
    header.className = 'display';
    const article = document.createElement('article');
    const h1 = document.createElement('h1');
    h1.textContent = title;
    article.appendChild(h1);

    article.appendChild(buildItem(tag, 'race'));
    article.appendChild(buildItem(tag, 'age'));
    article.appendChild(buildItem(tag, 'profession'));
    article.appendChild(buildItem(tag, 'location'));
    header.appendChild(article);
    
    if(tag.getAttribute('img')) {
      const img = document.createElement('img');
      img.src = tag.getAttribute('img');
      img.alt = 'NPC Image';
      header.appendChild(img);
    }

    card.appendChild(header);

    const separator = document.createElement('div');
    separator.className = 'separator';

    card.appendChild(separator);

    const infoHeader = document.createElement('h2');
    infoHeader.textContent = 'Info';
    card.appendChild(infoHeader);
    card.appendChild(getAttributeParagraph(tag, 'info', 'info_text'));

    const descriptionHeader = document.createElement('h2');
    descriptionHeader.textContent = 'Description';
    card.appendChild(descriptionHeader);
    card.appendChild(getAttributeParagraph(tag, 'description', 'info_text'));

    const tasksHeader = document.createElement('h2');
    tasksHeader.textContent = 'Tasks';
    card.appendChild(tasksHeader);
    card.appendChild(constructTaskList(tag));

    tag.parentNode.replaceChild(card, tag);
  });
}

// Navigation link handling
document.querySelectorAll('.note-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();                // prevent default link navigation
    const pageId = link.dataset.md;    // get which page to load
    loadMarkdownPageLocal(pageId);          // inject into #content
  });
});

document.querySelectorAll('.collapsible-list .toggle').forEach(item => {
  item.addEventListener('click', () => {
    const nested = item.nextElementSibling;
    if (nested) {
      nested.style.display = nested.style.display === 'block' ? 'none' : 'block';

      // Optional: toggle arrow
      item.textContent = item.textContent.startsWith('▶')
        ? item.textContent.replace('▶', '▼')
        : item.textContent.replace('▼', '▶');
    }
  });
});

// Load default note
loadMarkdownPage('session1');
