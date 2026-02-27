// Pomocné funkce pro rotující pozadí
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let max = 25;
let idx = randomInt(0, 24);

function updateBackground() {
    const ref = 'Images/page_ui/background_' + idx + '.jpg';
    document.body.style.backgroundImage = `url(${ref})`;
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
    const currentCampaign = localStorage.getItem('selectedCampaign') || 'rise';

    // Zde si doplň své postavy pro nové kampaně
    const campaignData = {
        'rise': {
            title: 'Rise of the Empire',
            roles: [
                { id: '--DM--', name: 'Game Master' },
                { id: '--ALGAAR--', name: 'Algaar' },
                { id: '--KRAG--', name: 'Krag' },
                { id: '--LYBA--', name: 'Lyba' },
                { id: '--RAAL--', name: 'Raal' },
                { id: '--TOHRU--', name: 'Tohru' }
            ]
        },
        'neverwitch': {
            title: 'Neverwitch all along',
            roles: [
                { id: '--DM--', name: 'Game Master' },
                { id: '--HENRY--', name: 'Henry Bastle' }, 
                { id: '--MELORIA--', name: 'Meloria' }
                { id: '--JACHYM--', name: 'Jáchym Podolský' }
 
            ]
        },
        'redcity': {
            title: 'Red City of Faith',
            roles: [
                { id: '--DM--', name: 'Game Master' },
                { id: '--JOZA--', name: 'Józa' }
                { id: '--GOLIATH--', name: 'Goliath' }
            ]
        }
    };

    const currentData = campaignData[currentCampaign] || campaignData['rise'];

    // Přepis nadpisu (Pokud jsi přidal id="campaign-title" do HTML)
    const titleElement = document.getElementById('campaign-title');
    if (titleElement) {
        titleElement.textContent = currentData.title;
    }

    // Vygenerování tlačítek s rolemi
    const rolesContainer = document.getElementById('roles');
    if (rolesContainer) {
        rolesContainer.innerHTML = ''; // Vyčistíme původní "natvrdo" napsaná tlačítka

        currentData.roles.forEach(roleInfo => {
            const roleDiv = document.createElement('div');
            roleDiv.className = 'role';
            roleDiv.dataset.role = roleInfo.id;
            roleDiv.textContent = roleInfo.name;

            // Co se stane po kliknutí na konkrétního hráče
            roleDiv.addEventListener('click', () => {
                window.location.href = `notes.html?role=${encodeURIComponent(roleInfo.id)}`;
            });

            rolesContainer.appendChild(roleDiv);
        });
    }


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