let idx = randomInt(0,8);
let max = 9;

document.querySelectorAll('.role').forEach(roleBtn => {
      roleBtn.addEventListener('click', () => {
        const role = roleBtn.dataset.role;
        // redirect to your main page with role as query param
        window.location.href = `notes.html?role=${encodeURIComponent(role)}`;
      });
    });

updateBackground();
setInterval(() => {
  idx = (idx + 1) % max;
  updateBackground();
}, 10000);

function updateBackground() {
    const ref = 'Images/page_ui/background_' + idx + '.jpg';
    document.body.style.backgroundImage = `url(${ref})`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}