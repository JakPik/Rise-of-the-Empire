const max = 25;
let idx = randomInt(0, 24);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateBackground() {
    const ref = 'Images/page_ui/background_' + idx + '.jpg';
    document.body.style.backgroundImage = `url(${ref})`;
}

function roleSelectConstructor(dictonary, title) {
    const titleElement = document.getElementById('campaign-title');
    const rolesContainer = document.getElementById('roles');

    if (titleElement) {
        titleElement.textContent = CAMPAIGNS[title] || 'Campaign';
    }

    if (rolesContainer) {
        rolesContainer.innerHTML = ''; // Vyčistíme původní "natvrdo" napsaná tlačítka

        for (const roleId in dictonary) {
            const roleDiv = document.createElement('div');
            roleDiv.className = 'role';
            roleDiv.textContent = dictonary[roleId] || "Unknown Player";

            // Co se stane po kliknutí na konkrétního hráče
            roleDiv.addEventListener('click', () => {
                window.location.href = `notes.html?role=${encodeURIComponent(roleId)}`;
            });

            rolesContainer.appendChild(roleDiv);
        };
    }
}

function loadRoleSelect() {
    const currentCampaign = localStorage.getItem('selectedCampaign');

    switch (currentCampaign) {
    case 'RISE':
        roleSelectConstructor(PLAYERS_RISE, currentCampaign);
        break;
    case 'NEVERWITCH':
        roleSelectConstructor(PLAYERS_NEVERWITCH, currentCampaign);
        break;
    case 'REDCITY':
        roleSelectConstructor(PLAYERS_REDCITY, currentCampaign);
        break;
    default:
        break;
    }
}

// Vše spustíme, až když je stránka plně načtená
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. SPUŠTĚNÍ ROTUJÍCÍHO POZADÍ ---
    updateBackground();
    setInterval(() => {
      idx = (idx + 1) % max;
      updateBackground();
    }, 10000);

    // --- 2. DYNAMICKÝ VÝBĚR POSTAV PODLE KAMPANĚ ---
    loadRoleSelect();
    
    // --- 3. HUDBA NA POZADÍ ---
    const bgMusic = document.getElementById("bgMusic");
    const playButton = document.getElementById("playButton");

    if (bgMusic) {
        bgMusic.volume = 0.5; 

        // Pokus o automatické spuštění
        bgMusic.play().then(() => {
            if (playButton) playButton.style.display = "none";
            console.log("Hudba hraje epicky na pozadí!");
        }).catch((error) => {
            console.log("Prohlížeč zablokoval automatické přehrávání. Uživatel musí kliknout na tlačítko.");
        });
    }

    // Tlačítko pro manuální spuštění
    if (playButton) {
        playButton.addEventListener("click", function() {
            if (bgMusic) bgMusic.play();
            playButton.style.display = "none";
        });
    }
});

