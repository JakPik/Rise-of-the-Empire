const contentEl = document.getElementById('content');
const sidebar = document.getElementById('sidebar');

init();

async function loadMarkdownPage(pageId) {
  try {
    if(pageId.includes(".md")) {
      const rest = await fetch(pageId);
      if (!rest.ok) throw new Error('Failed to fetch: ' + rest.status);
      const md = await rest.text();
      parseMarkdown(md, pageId);
    }
    else {
      contentEl.innerHTML = '<div id="map"></div>';
      const rest = await fetch(pageId)
      .then(res => res.json())
      .then(data => {
      buildMap(data);
      });
    }
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
    const ul = document.querySelector('.collapsible-list');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'note-link';
    const fullPath = `source/json/worldmap.json`; // include subfolder path
    a.dataset.path = fullPath;
    a.textContent = "World Map";
    li.appendChild(a);
    ul.appendChild(li);
    buildNavBar(data, ul);
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

function testGetValue(dictonary, key) {
  if(dictonary && dictonary[key]) {
    return dictonary[key];
  }
  else {
    return "Ghost";
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
}

function init() {
  const header = document.getElementById('main_header');
  const currentCampaign = localStorage.getItem('selectedCampaign') || 'RISE';
  const toggleBtn = document.getElementById('toggle-sidebar');
  const urlParams = new URLSearchParams(window.location.search);
  let navFileToLoad = '';

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  document.querySelectorAll('.backLink').forEach(roleBtn => {
        roleBtn.addEventListener('click', () => {
          // redirect to your main page with role as query param
          window.location.href = `index.html`;
        });
      });

  window.addEventListener('resize', updateCarousel);
  window.PLAYER_ROLE = urlParams.get('role');
  
  header.textContent = CAMPAIGNS[currentCampaign] || CAMPAIGNS['RISE'];

  switch (currentCampaign) {
    case 'RISE':
      header.textContent += " - " + testGetValue(PLAYERS_RISE, window.PLAYER_ROLE);
      navFileToLoad = 'source/json/NavBar.json';
      break;
    case 'NEVERWITCH':
      header.textContent += " - " + testGetValue(PLAYERS_NEVERWITCH, window.PLAYER_ROLE);
      navFileToLoad = 'source/json/NavBarNeverw.json';
      break;
    case 'REDCITY':
      header.textContent += " - " + testGetValue(PLAYERS_REDCITY, window.PLAYER_ROLE);
      navFileToLoad = 'source/json/NavBarRedCity.json';
      break;
    default:
      header.textContent += " - Campaign";
      navFileToLoad = 'source/json/NavBar.json';
      break;
  }

  start(navFileToLoad); 
}