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

function updateCarousel() {
  const ref = document.getElementsByClassName('carousel')[0];
  const track = document.getElementsByClassName('carousel-track')[0];
  const curIdx = +ref.dataset.currentIndex;
  let width = 2;
  for(let i = 0; i < curIdx; i++) {
    width += track.children[i].clientWidth;
    width += 3;
  }
  
  ref.style.width = track.children[curIdx].clientWidth + 'px';
  track.style.transform = `translateX(-${width}px)`;
}

function spinCarousel(offset) {
    const ref = document.getElementsByClassName('carousel')[0];
    const totalSlides = +ref.dataset.slides;
    let currentIndex = +ref.dataset.currentIndex;
    let num = (currentIndex + offset + totalSlides) % totalSlides;
    ref.dataset.currentIndex = num;
    updateCarousel();
}

function testVisibility(value) {
    if(value){
        if(Object.keys(value).length === 0) {
            return false;
        }
        else if(!value.some(v => PLAYERS.includes(v))) {
            return false;
        }
        else if(window.PLAYER_ROLE == "DM") {
            return false;
        }
        else if(value.includes(window.PLAYER_ROLE)) {
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