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
    const link = '#' + attributeName.trim()                // remove extra spaces
                    .toLowerCase()         // make lowercase
                    .replace(/\s+/g, '-'); // replace spaces with dashes
                    
    div.appendChild(getHeader('h3', attributeName + ':', link));

    const p = document.createElement('p');
    p.textContent = content;
    div.appendChild(p);
    return div;
}

function getHeader(header, title, link) {
    var tempHeader;
    if(link && link != undefined) {
        tempHeader = document.createElement('a');
        tempHeader.textContent = title;
        tempHeader.href = link;
        tempHeader.id = header;
    }
    else {
        tempHeader = document.createElement(header);
        tempHeader.textContent = title;
    }
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

function getImage(tag, height) {
    const div = document.createElement('div');
    //div.appendChild(buildModal());
    const images = tag.dataset['img'].split(',').map(item => item.trim());
    if (images.length > 1) {
        div.appendChild(buildCarousel(images, height));
    }
    else {
        div.appendChild(BuildImage(images[0], height));
    }
    return div;
}

function BuildImage(src, height) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = src;
    img.style.height = height==0 ? 300 : height + 'px';
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
    img.alt = 'modalImage';
    modal.appendChild(img);
    return modal;
}

function buildCarousel(images, height) {
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
    buttonPrev.onclick = () => { spinCarousel(-1, carousel); };
    const buttonNext = document.createElement('button');
    buttonNext.className = 'next';
    buttonNext.textContent = '>';
    buttonNext.onclick = () => { spinCarousel(1, carousel); };
    const imgContainer = document.createElement('div');
    imgContainer.className = 'carousel-track';
    for(let i = 0; i < num; i++) {
        imgContainer.appendChild(BuildImage(images[i], height));
    }
    div.appendChild(buttonPrev);
    carousel.appendChild(imgContainer);
    div.appendChild(carousel);
    div.appendChild(buttonNext);

    imgContainer.children[0].onload = () => {
            var h = 300;
            if(height != undefined) {
                h = height.trim().endsWith("px") ? +height.trim().slice(0, -2) : 300;
                h = h==0 ? 300 : h;
            }
            const width = +imgContainer.children[0].width / ( +imgContainer.children[0].height / +h);
            imgContainer.style.width = width + 'px';
            //document.getElementsByClassName('carousel')[0].style.width = width + 'px';
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
        li.href = "notes/Quests/" + task + ".md";
        li.textContent = task;
        li.className = 'clickableLink';
        li.style.cursor = 'pointer';
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

function constructNPCList(tag, md) {
    const tasksList = document.createElement('ul');
    const tasksAttr = tag.dataset['npc'];
    const taskArr = tasksAttr ? tasksAttr.split(',').map(item => item.trim()) : [];
    const path = md.split('/');
    taskArr.forEach(task => {
        const li = document.createElement('li');
        li.href = path[0] + "/NPCs/" + path[2] + "/" + path[4] +  "/" + task + ".md";
        li.textContent = task;
        li.className = 'clickableLink';
        li.style.cursor = 'pointer';
        tasksList.appendChild(li);
    });

    return tasksList;
}
