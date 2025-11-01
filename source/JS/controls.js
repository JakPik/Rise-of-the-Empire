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
  const maxIdx = +ref.dataset.slides;
  let width = 0;
  track.style.transition = "transform 0.8s ease-in-out"
  for(let i = 0; i < ref.dataset.currentIndex; i++) {
    width += track.children[i].clientWidth;
    width += 5;
  }
  
  ref.style.width = track.children[ref.dataset.currentIndex].clientWidth + 'px';
  track.style.transform = `translateX(-${width}px)`;
}

function adjustCarousel() {
    const ref = document.getElementsByClassName('carousel')[0];
  const track = document.getElementsByClassName('carousel-track')[0];
  const curIdx = +ref.dataset.currentIndex;
  const maxIdx = +ref.dataset.slides;
  if(curIdx == 0) {
    track.style.transition = "transform 0.0s ease-in-out";
    for(let i = 0; i < maxIdx - 1; i++) {
      width += track.children[i].clientWidth;
      width += 5;
    }
    ref.dataset.currentIndex = maxIdx - 1;
    ref.style.width = track.children[ref.dataset.currentIndex].clientWidth + 'px';
    track.style.transform = `translateX(-${width}px)`;
  }
  else if(curIdx == maxIdx - 1) {
    track.style.transition = "transform 0.0s ease-in-out";
    width += track.children[0].clientWidth;
    width += 5;

    ref.dataset.currentIndex = 1;
    ref.style.width = track.children[ref.dataset.currentIndex].clientWidth + 'px';
    track.style.transform = `translateX(-${width}px)`;
  }
}

function spinCarousel(offset) {
    const ref = document.getElementsByClassName('carousel')[0];
    const totalSlides = +ref.dataset.slides;
    let currentIndex = +ref.dataset.currentIndex;
    let num = (currentIndex + offset + totalSlides) % totalSlides;
    ref.dataset.currentIndex = num;
    updateCarousel();
}