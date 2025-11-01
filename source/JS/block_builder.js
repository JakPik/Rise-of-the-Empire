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
    const div = document.createElement('div');
    div.appendChild(buildModal());
    const images = tag.dataset['img'].split(',').map(item => item.trim());
    if (images.length > 1) {
        div.appendChild(buildCarousel(images));
    }
    else {
        div.appendChild(BuildImage(images[0]));
    }
    return div;
}

function BuildImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = src;
    img.className = 'zoomable';
    img.onclick = openImage;
    return img;
}

function buildModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    modal.onclick = closeImage;
    const img = document.createElement('img');
    img.className = 'modal-content';
    img.id = 'modalImage';
    modal.appendChild(img);
    return modal;
}

function buildCarousel(images) {
    const div = document.createElement('div');
    div.className = 'container';
    const carousel = document.createElement('div');
    carousel.dataset.currentIndex = 0;
    const num = +images.length;
    carousel.dataset.slides = num;
    carousel.className = 'carousel';
    const buttonPrev = document.createElement('button');
    buttonPrev.className = 'prev';
    buttonPrev.textContent = '<';
    buttonPrev.onclick = () => { spinCarousel(-1); };
    const buttonNext = document.createElement('button');
    buttonNext.className = 'next';
    buttonNext.textContent = '>';
    buttonNext.onclick = () => { spinCarousel(1); };
    const imgContainer = document.createElement('div');
    imgContainer.className = 'carousel-track';
    for(let i = 0; i < num; i++) {
        imgContainer.appendChild(BuildImage(images[i]));
    }
    div.appendChild(buttonPrev);
    carousel.appendChild(imgContainer);
    div.appendChild(carousel);
    div.appendChild(buttonNext);

    imgContainer.children[0].onload = () => {
            const width = +imgContainer.children[0].width / ( +imgContainer.children[0].height / 300);
            document.getElementsByClassName('carousel')[0].style.width = width + 'px';
        };
    return div;
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
