// script.js
// Loads a Markdown file, renders it, and replaces <event> tags
// with a styled card (title + date/location table).

const contentEl = document.getElementById('content');

const markdownPages = {
  session1: `
<div class="Day" data-day="1">
  line 1
  <div class="Player_Info" id="Algaar">
      This is test Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem assumenda excepturi eum fuga iure cupiditate enim architecto quaerat odit eveniet illo provident, repellat nobis facere explicabo nulla ipsum deleniti temporibus?
      1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit recusandae excepturi soluta, nobis iste facere dignissimos exercitationem quam consectetur incidunt tempora optio. Et eaque alias ullam? Obcaecati id officia alias.
      2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloremque non in necessitatibus minima, dicta similique iste molestiae soluta totam aliquam corporis officia alias ut minus nesciunt, impedit officiis? Similique.
    </div>
    line 2
    <div class="Player_Info" id="Tohru">
      This is test Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem assumenda excepturi eum fuga iure cupiditate enim architecto quaerat odit eveniet illo provident, repellat nobis facere explicabo nulla ipsum deleniti temporibus?
      1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit recusandae excepturi soluta, nobis iste facere dignissimos exercitationem quam consectetur incidunt tempora optio. Et eaque alias ullam? Obcaecati id officia alias.
      2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloremque non in necessitatibus minima, dicta similique iste molestiae soluta totam aliquam corporis officia alias ut minus nesciunt, impedit officiis? Similique.
    </div>
    line 3
</div>

<div class="NPC"
data-name="Františike"
data-race="člověk"
data-profession="Obchodník"
data-age="28"
data-location="Bronzová vesnice (může být odkaz)"
data-info="Zajímamvé informace of Františkovy"
data-description="Popis Františka, jak vypadá, co má za charakteristcké vlastnosti, např. jizva pod okem"
data-tasks="Seznam úkolů"
data-img="Images/naoki.jpg"
></div>

---

<div class="Quest"
data-name="Ztracený náhrdelník"
data-who="František"
data-where="Bronzová vesnice"
data-reward="100 zlatých mincí"
data-deadline="Do festivalu Ohně"
data-status="Probíhající"
data-description="Popis questu, co se stalo, jak náhrdelník vypadal, proč je důležitý"
></div>

---

<div class="Location"
data-name="Bronzová vesnice"
data-info="Informace o Bronzové vesnici"
data-img="bronzova.jpg"
data-buildings="Hostinec U zlatého lva: vyhlaseny bar, Kovárna, Tržiště"
></div>

## Hostinec U zlatého lva
velmi zlouhavý text Ah, I see! You want to change the background behind the Leaflet map container itself, not the map tiles. That’s purely CSS for the container or the page. Leaflet maps sit inside a (e.g., #map), so you can style what’s behind it.

## Vyhlaseny bar
fnsajkfaksjfkajf

## Kovárna
jjhafjfjklajfklaj
`,
  session2: `
<div class="Location"
data-name="Bronzová vesnice"
data-info="Informace o Bronzové vesnici"
data-img="bronzova.jpg"
data-buildings="Hostinec U zlatého lva: vyhlaseny bar, Kovárna, Tržiště"
></div>

# title
- bullet point 1
> [!info]
> block
> test
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
  parseMarkdown(md);
}

async function loadMarkdownPage(pageId) {
  try {
    const rest = await fetch(pageId);
    if (!rest.ok) throw new Error('Failed to fetch: ' + rest.status);
    const md = await rest.text();
    parseMarkdown(md);
  }
  catch (err) {
    contentEl.innerHTML = '<p>Error loading page: ' + err.message + '</p>';
  }
}

async function start(pageId) {
  try {
    const rest = await fetch(pageId)
  .then(res => res.json())
  .then(data => {
    buildNavBar(data, document.querySelector('.collapsible-list'));
  });
  }
  catch (err) {
    contentEl.innerHTML = '<p>Error loading page: ' + err.message + '</p>';
  }
  setUpEvents();
}

function buildNavBar(folder, parentEl, basePath = '') {
  for (const key in folder) {
    const value = folder[key];
    const li = document.createElement('li');

    if (key.endsWith('.md')) {
      if(testVisibility(value)) {
        continue;
      }
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'note-link';
      const fullPath = `${basePath}/${key}`; // include subfolder path
      a.dataset.path = fullPath;
      if (value.includes("--DEAD--")) {
        a.textContent = key.replace('.md', '') + " ✝";
      }
      else {
        a.textContent = key.replace('.md', '');
      }
      li.appendChild(a);
    } else {   
        if(basePath == '') {
          buildNavBar(value,parentEl ,`${key}`); // recursive with folder path
        }
        else {
          const span = document.createElement('span');
          span.className = 'toggle';
          span.textContent = '▶ ' + key;
          const nested = document.createElement('ul');
          nested.className = 'nested';
          li.appendChild(span);
          li.appendChild(nested);
          buildNavBar(value, nested, `${basePath}/${key}`); // recursive with folder path
        }
    }

    parentEl.appendChild(li);
  }
}


function setUpEvents() {

// Navigation link handling
document.querySelectorAll('.note-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();                // prevent default link navigation
    const pageId = link.dataset.path;    // get which page to load
    loadMarkdownPage(pageId);          // inject into #content
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

document.querySelectorAll('.backLink').forEach(roleBtn => {
      roleBtn.addEventListener('click', () => {
        // redirect to your main page with role as query param
        window.location.href = `index.html`;
      });
    });
}

window.addEventListener('resize', updateCarousel);




// Load default note
//loadMarkdownPage('session1');
//loadMarkdownPageLocal('session1');
//setUpEvents();

const urlParams = new URLSearchParams(window.location.search);
const playerRole = urlParams.get('role');

  // Store role globally if needed
window.PLAYER_ROLE = playerRole;

const header = document.getElementById('main_header');
let tag = window.PLAYER_ROLE;
header.textContent += " - " + PLAYERS_MAP[window.PLAYER_ROLE.replace(/^--|--$/g, '')];

start('source/json/NavBar.json');
