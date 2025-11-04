let foundTags = [];

function parseMarkdown(md) {
  const parsed = preprocessCallouts(md);
  contentEl.innerHTML = marked.parse(parsed);
  processNPCTags();
  processLocationTags();
  processQuestTags();
  processDayTag();
  processPlayerInfoTag();
  processHeadingTags();
  processImageViewTags();

  

  document.querySelectorAll('.content .toggle').forEach(item => {
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

function processHeadingTags() {
  const tags = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  tags.forEach(tag => {
    if (!tag.id) { // only set if missing
    tag.id = tag.textContent
      .trim()                // remove extra spaces
      .toLowerCase()         // make lowercase
      .replace(/\s+/g, '-'); // replace spaces with dashes
  }
  });
}

function preprocessCallouts(md) {
  md = md.replace(
    /^>\s*\[!(\w+)\]\s*\n((?:>\s?.*\n?)*)/gm,
    (_, kind, content) => {
      const lines = content
        .trim()
        .split(/\n/)
        .map(line => line.replace(/^>\s?/, '').trim())
        .filter(line => line.length > 0 || line.includes('--DEAD--'));

      const body = lines.map(l => `<p>${l}</p>`).join('\n');
      return calloutBlock(kind, lines);//`<div class="callout" id="${kind.toLowerCase()}">\n${body}\n</div>`;
    }
  );
  let lines = md.split('\n');

lines = lines.filter(line => {
  const tagsInLine = line.match(/--\w+--/g); // find all --TAG-- in the line
  if (tagsInLine) {
    foundTags.push(...tagsInLine); // add all found tags to the array
    return false; // remove this line from the content
  }
  return true; // keep the line
});

return lines.join('\n');
}

function calloutBlock(kind, lines) {  
    const id = kind.toLowerCase();
  	const header = `<h1>${kind}</h1>`;
  	const body = lines.map(line => `<p>${line}</p>`).join('\n');
  
  	return `<div class="callout" id="${id}">
    	${header}
		<hr>
    	${body}
  		</div>`;
}

function processImageViewTags() {
  const tags = document.querySelectorAll('.Image_View');

  tags.forEach(tag => {
    const card = document.createElement('div');
    card.appendChild(getImage(tag));

    tag.parentNode.replaceChild(card, tag);
  });
}

function processLocationTags() {
  const tags = document.querySelectorAll('.Location');

  tags.forEach(tag => {
    const rawName = tag.dataset['name'];
    const title = rawName || 'Unnamed Location';
  
    const card = document.createElement('div');
    card.appendChild(getHeader('h1', title));
    card.appendChild(getHeader('h2', 'Popis'));
    if(tag.dataset['img']) {
      card.appendChild(getImage(tag));
    }
    card.appendChild(getAttributeParagraph(tag.dataset['info'], 'info_text'));
    card.appendChild(separator());
    card.appendChild(getHeader('h2', 'Budovy'));
    card.appendChild(constructBuildingList(tag));

    tag.parentNode.replaceChild(card, tag);
  });
}

function processNPCTags() {
  const tags = document.querySelectorAll('.NPC');

  tags.forEach(tag => {
    const rawName = tag.dataset['name'];
    const title = rawName || 'Unnamed Event';

    const card = document.createElement('div');
    
    const header = document.createElement('div');
    header.className = 'display';
    const article = document.createElement('article');
    article.appendChild(getHeader('h1', title));

    article.appendChild(buildItem(tag, 'race'));
    article.appendChild(buildItem(tag, 'age'));
    article.appendChild(buildItem(tag, 'profession'));
    article.appendChild(buildItem(tag, 'location'));
    header.appendChild(article);
    
    if(tag.dataset['img']) {
      header.appendChild(getImage(tag));
    }

    card.appendChild(header);

    card.appendChild(separator());
    card.appendChild(getHeader('h2', 'Info'));
    card.appendChild(getAttributeParagraph(tag.dataset['info']));
    card.appendChild(getHeader('h2', 'Description'));
    card.appendChild(getAttributeParagraph(tag.dataset['description']));
    card.appendChild(getHeader('h2', 'Tasks'));
    card.appendChild(constructTaskList(tag));

    tag.parentNode.replaceChild(card, tag);
  });
}

function processQuestTags() {
  const tags = document.querySelectorAll('.Quest');

  tags.forEach(tag => {
    const rawName = tag.dataset['name'];
    const title = rawName || 'Unnamed Event';

    const card = document.createElement('div');
    card.appendChild(getHeader('h1', title));
    card.appendChild(buildItem(tag, 'who'));
    card.appendChild(buildItem(tag, 'where'));
    card.appendChild(buildItem(tag, 'reward'));
    card.appendChild(buildItem(tag, 'deadline'));
    card.appendChild(buildItem(tag, 'status'));
    card.appendChild(separator());
    card.appendChild(getHeader('h2', 'Popis'));
    card.appendChild(getAttributeParagraph(tag.dataset['description']));

    tag.parentNode.replaceChild(card, tag);
  
  });
}

function processPlayerInfoTag(_tag, parent) {
	var doc = document;
	if(_tag != undefined) {
	const parser = new DOMParser();
	doc = parser.parseFromString(_tag.innerHTML, "text/html");
	}
  	const tags = document.querySelectorAll('.Player_Info');

  tags.forEach(tag => {
    const rawName = tag.id;
    const split = tag.innerHTML.split(/\n/);
    const title = rawName || 'Unnamed Event';

    const card = document.createElement('div');
	card.className = 'Player_Info';
	card.id = tag.id;


    const h2 = getHeader('h2', '');
    h2.className = 'toggle';
    h2.textContent = '▶ ' + title;
	const div = document.createElement('div');
    div.className = 'nested';
	div.style="display: none;"

	for(var key in split) {
      div.appendChild(getAttributeParagraph(split[key]));
    }
    card.appendChild(h2);
	card.appendChild(div);
	if(parent != undefined) {
		parent.appendChild(card);
	}
	else {
    tag.parentNode.replaceChild(card, tag);
	}
  });
}

function processDayTag() {
  const tags = document.querySelectorAll('.Day');

  tags.forEach(tag => {
    const rawName = "Day " + tag.dataset['day'];
    const title = rawName || 'Unnamed Event';

    const card = document.createElement('div');
	card.className = "Day";

	const h1 = getHeader('h1', '');
    h1.className = 'toggle';
    h1.textContent = ' ' + title;
	const div = document.createElement('div');
    div.className = 'nested';
	div.style="display: none;"

	Array.from(tag.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('Player_Info')) {
    // Process Player_Info into structured card
			div.appendChild(node.cloneNode(true));
		} 
		else if (node.nodeType === Node.TEXT_NODE) {
			// Clean up and split text content into paragraphs
			const text = node.data.split(/\n/);
			if (text.length > 0) {
			// Split on blank lines or double newlines
			text.forEach(pText => {
				const p = document.createElement('p');
				p.textContent = pText.trim();
				if (p.textContent.length > 0) div.appendChild(p);
			});
			}
		} 
		else {
			// Preserve other element types as-is
			div.appendChild(node.cloneNode(true));
		}
    });
    
	card.appendChild(h1);
	card.appendChild(div);

    tag.parentNode.replaceChild(card, tag);
  });
}
