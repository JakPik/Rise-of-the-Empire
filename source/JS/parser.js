function parseMarkdown(md) {
  //const parsed = preprocessCallouts(md);
  contentEl.innerHTML = marked.parse(md);
  processNPCTags();
  processLocationTags();
  processQuestTags();
}

function preprocessCallouts(md) {
  return md.replace(
    /^>\s*\[!(\w+)\]\s*\n((?:>\s?.*\n?)*)/gm,
    (_, kind, content) => {
      const lines = content
        .trim()
        .split(/\n/)
        .map(line => line.replace(/^>\s?/, '').trim())
        .filter(line => line.length > 0 && !line.includes('--DEAD--'));

      const body = lines.map(l => `<p>${l}</p>`).join('\n');
      return calloutBlock(kind, lines);//`<div class="callout" id="${kind.toLowerCase()}">\n${body}\n</div>`;
    }
  );
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