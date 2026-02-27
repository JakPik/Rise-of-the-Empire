let idx = randomInt(0,24);
let max = 25;

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

const button = document.getElementById('playButton');
    const music = document.getElementById('bgMusic');

    button.addEventListener('click', () => {
      music.play();
      button.style.display = 'none';
    });


document.addEventListener("DOMContentLoaded", function() {
    const bgMusic = document.getElementById("bgMusic");
    const playButton = document.getElementById("playButton");

    // Pro jistotu nastavíme hlasitost (0.0 až 1.0)
    bgMusic.volume = 0.5; 

    // Pokus o automatické spuštění hudby ihned po načtení
    bgMusic.play().then(() => {
        // Pokud se to povede (prohlížeč to nezablokuje), skryjeme tlačítko Play
        if (playButton) {
            playButton.style.display = "none";
        }
        console.log("Hudba hraje epicky na pozadí!");
    }).catch((error) => {
        // Prohlížeč zablokoval autoplay kvůli chybějící interakci
        console.log("Prohlížeč zablokoval automatické přehrávání. Uživatel musí kliknout na tlačítko.");
        // Tlačítko zůstane viditelné
    });

    // Původní funkčnost tlačítka, kdyby automatické spuštění selhalo
    if (playButton) {
        playButton.addEventListener("click", function() {
            bgMusic.play();
            playButton.style.display = "none"; // Po manuálním spuštění tlačítko zmizí
        });
    }
});