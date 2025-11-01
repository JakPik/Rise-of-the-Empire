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