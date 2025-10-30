function buildItem(tag, attributeName) {
    const div = document.createElement('div');
    div.className = 'item';

    div.appendChild(getHeader('h3', attributeName + ':'));

    div.appendChild(getAttributeParagraph(tag.dataset[attributeName]));
    return div;
}

function buildItemList(attributeName, content) {
    const div = document.createElement('div');
    div.className = 'item';

    div.appendChild(getHeader('h3', attributeName + ':'));

    const p = document.createElement('p');
    p.textContent = content;
    div.appendChild(p);
    return div;
}

function getHeader(header, title) {
    const tempHeader = document.createElement(header);
    tempHeader.textContent = title;
    return tempHeader;
}

function getAttributeParagraph(content, className) {
    const p = document.createElement('p');
    const text = content;
    p.textContent = text;
    if (className) {
        p.className = className;
    }
    return p;
}

function getImage(tag) {
    const img = document.createElement('img');
    const text = tag.dataset['img'];
    img.src = text;
    img.alt = text;
    return img;
}

function separator() {
    const separator = document.createElement('hr');
    return separator;
}

function constructTaskList(tag) {
    const tasksList = document.createElement('ul');
    const tasksAttr = tag.dataset['tasks'];
    const taskArr = tasksAttr ? tasksAttr.split(',').map(item => item.trim()) : [];

    taskArr.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        tasksList.appendChild(li);
    });

    return tasksList;
}

function constructBuildingList(tag) {
    const tasksList = document.createElement('ul');
    const tasksAttr = tag.dataset['buildings'];
    const taskArr = tasksAttr ? tasksAttr.split(',').map(item => item.trim()) : [];

    taskArr.forEach(task => {
        const li = document.createElement('li');
        const pair = task.split(':').map(item => item.trim());
        li.appendChild(buildItemList(pair[0], pair[1]));
        tasksList.appendChild(li);
    });

    return tasksList;
}
