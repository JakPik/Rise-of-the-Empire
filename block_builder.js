function buildItem(tag, attributeName) {
    const div = document.createElement('div');
    div.className = 'item';

    const h2 = document.createElement('h2');
    h2.textContent = attributeName + ':';
    div.appendChild(h2);

    div.appendChild(getAttributeParagraph(tag, attributeName));
    return div;
}

function getAttributeParagraph(tag, attributeName, className) {
    const p = document.createElement('p');
    const text = tag.getAttribute(attributeName);
    p.textContent = text;
    if (className) {
        p.className = className;
    }
    return p;
}

function constructTaskList(tag) {
    const tasksList = document.createElement('ul');
    const tasksAttr = tag.getAttribute('tasks');
    const taskArr = tasksAttr ? tasksAttr.split(',').map(item => item.trim()) : [];

    taskArr.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        tasksList.appendChild(li);
    });

    return tasksList;
}