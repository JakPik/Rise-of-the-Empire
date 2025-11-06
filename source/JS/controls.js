const PLAYERS = ["DM","ALGAAR","KRAG","LYBA","SADOSU","TOHRU"];
const PLAYERS_MAP = {
  DM: "DM",
  ALGAAR: "Algaar",
  KRAG: "Krag",
  LYBA: "Lyba",
  SADOSU: "Sadosu",
  TOHRU: "Tohru"
};

function openImage(img) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  const imgsrc = img.srcElement.alt;
  modalImg.src = imgsrc;
}

function closeImage() {
  document.getElementById("imageModal").style.display = "none";
}

function updateCarousel(carousel) {
  
  const track = carousel.getElementsByClassName('carousel-track')[0];
  const curIdx = +carousel.dataset.currentIndex;
  let width = 2;
  for(let i = 0; i < curIdx; i++) {
    width += track.children[i].clientWidth;
    width += 3;
  }
  
  carousel.style.width = track.children[curIdx].clientWidth + 'px';
  track.style.transform = `translateX(-${width}px)`;
}

function spinCarousel(offset, carousel) {
    const totalSlides = +carousel.dataset.slides;
    let currentIndex = +carousel.dataset.currentIndex;
    let num = (currentIndex + offset + totalSlides) % totalSlides;
    carousel.dataset.currentIndex = num;
    updateCarousel(carousel);
}

function testVisibility(value) {
    var tag = [];
    if(Array.isArray(value)) {
      tag = value;
    }
    else {
      tag.push(value.replace(/^--|--$/g, ''));
    }
    if(tag){
        if(Object.keys(tag).length === 0) {
            return false;
        }
        else if(!tag.some(v => PLAYERS.includes(v))) {
            return false;
        }
        else if(window.PLAYER_ROLE == "DM") {
            return false;
        }
        else if(tag.includes(window.PLAYER_ROLE)) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}
