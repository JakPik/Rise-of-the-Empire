// script.js
// Loads a Markdown file, renders it, and replaces <event> tags
// with a styled card (title + date/location table).

const contentEl = document.getElementById('content');

const markdownPages = {
  session1: `
<div class="Day" data-day="1">
  line 1
  <div class="Player_Info" id="Algaar">
      This is test Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem assumenda excepturi eum fuga iure cupiditate enim architecto quaerat odit eveniet illo provident, repellat nobis facere explicabo nulla ipsum deleniti temporibus?
      1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit recusandae excepturi soluta, nobis iste facere dignissimos exercitationem quam consectetur incidunt tempora optio. Et eaque alias ullam? Obcaecati id officia alias.
      2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloremque non in necessitatibus minima, dicta similique iste molestiae soluta totam aliquam corporis officia alias ut minus nesciunt, impedit officiis? Similique.
    </div>
    line 2
    <div class="Player_Info" id="Tohru">
      This is test Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem assumenda excepturi eum fuga iure cupiditate enim architecto quaerat odit eveniet illo provident, repellat nobis facere explicabo nulla ipsum deleniti temporibus?
      1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit recusandae excepturi soluta, nobis iste facere dignissimos exercitationem quam consectetur incidunt tempora optio. Et eaque alias ullam? Obcaecati id officia alias.
      2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloremque non in necessitatibus minima, dicta similique iste molestiae soluta totam aliquam corporis officia alias ut minus nesciunt, impedit officiis? Similique.
    </div>
    line 3
</div>

<div class="NPC"
data-name="Františike"
data-race="člověk"
data-profession="Obchodník"
data-age="28"
data-location="Bronzová vesnice (může být odkaz)"
data-info="Zajímamvé informace of Františkovy"
data-description="Popis Františka, jak vypadá, co má za charakteristcké vlastnosti, např. jizva pod okem"
data-tasks="Seznam úkolů, hodně ukolu"
data-img="Images/naoki.jpg"
></div>

---

<div class="Quest"
data-name="Ztracený náhrdelník"
data-who="František"
data-where="Bronzová vesnice"
data-reward="100 zlatých mincí"
data-deadline="Do festivalu Ohně"
data-status="Probíhající"
data-description="Popis questu, co se stalo, jak náhrdelník vypadal, proč je důležitý"
></div>

---

<div class="Location"
data-name="Bronzová vesnice"
data-info="Informace o Bronzové vesnici"
data-img="bronzova.jpg"
data-buildings="Hostinec U zlatého lva: vyhlaseny bar, Kovárna, Tržiště"
data-NPCs="František, Skelgrond, ... "
data-settlement="Elakdet"
></div>

Zatímco slunce klesá k obzoru, osada se hemží činností. Na pobřeží, mezi domy na kůlech a plovoucími plošinami, osadníci zpracovávají svůj denní úlovek z moře. Rybářské sítě, ještě vlhké od slané vody, jsou rozprostřené podél lávek a na hácích visí dlouhé šňůry plné stříbřitých ryb. Vzduch je prosycen vůní mořské soli a čerstvé rybí kůže, která se ve večerním slunci leskne, jakoby byla pokrytá drahokamy.
Někteří osadníci ručně čistí a odstraňují šupiny z velkých kusů, jejich nože se míhají v rychlých, přesných pohybech. Jiní pracují u ohnišť, kde na dřevěných rámech suší jemně prosolené plátky masa. V horku ohně se rybí maso začíná měnit – jeho povrch zlatne, tučnější kusy tiše prskají, a z šupin stoupá jemná vůně kouře, která se šíří po celé osadě.
Mezi lidmi vládne tichá, soustředěná atmosféra, každý má svou roli v procesu. Stříbřitě modré ryby, jejichž těla se ve vlnách ještě před pár hodinami blyštila, teď tvoří zásoby na horší časy – sušené, uzené a připravené k uchování. 
Nedaleko kovárny, kde sálá žár z pece a zvuk kladiva se nese večerním vzduchem, právě Krag spolu se svým přítelem Kentou dokončují stahování zvěře z nedávného lovu. Kovárna, specializující se na bronzové nástroje a zbraně, je místo plné síly, kde se bronz roztéká a tvaruje do podoby ostrých čepelí a pevných nástrojů. Kenta, svalnatý a mohutný stejně jako Krag, pracuje vedle něj, jejich souhra je tichá a efektivní. Masivní ruce Kraga s přesností stahují kůži z uloveného zvířete, zatímco kolem nich se zvedá vůně čerstvé kožešiny a krve.
Zvuky, které se začínají šířit od brány osady, přitahují jejich pozornost. Dav osadníků se shromažďuje, hlasy jsou plné očekávání a vzrušení. Krag se narovná, jeho obrovská postava vrhá dlouhý stín na zem, zatímco Kenta už také odložil své nástroje. Očima si vymění mlčenlivé porozumění – je čas zjistit, kdo způsobil tento rozruch.
Setřou si krev z rukou, krag si přehodí kožešinu přes rameno, a oba se mlčky vydávají směrem k bráně, kde se osadníci tlačí kolem neznámého příchozího, který narušil klidný večer v této osadě.

Jak slunce začalo zapadat za vzdálené hory, nebe se barvilo do odstínů zlata, růžové a purpurové. Bylo to, jako by se svět chystal ponořit do kouzelného snu. Každý paprsek slunce, který se odrážel od křišťálově čistých řek a jezer, jako by šeptal tajemství starých časů a přísliby nových zázraků.
Ve stínech lesa, kde se větve stromů skláněly jako ochranitelská křídla nad vesnicí, se zjevil druid. Jeho postava byla vysoká a majestátná, s dračími šupinami, které se blyštily jako drahokamy v posledních paprscích denního světla. Jeho oči, hluboké jako temné jezero, hleděly přímo před sebe s klidnou odhodlaností.
Byl vyslancem vládce, pověřený důležitým úkolem. Úkolem, při jehož plnění již urazil dlouhou cestu. 
Jeho cesta začala na palubě lodi, která se vznášela nad vlnami jako labutí peří. Loď, ověnčená zářivými prapory a zdobená zlatými rytinami, plula podél útesu se starodávnou věží tak vysokou, že její vrcholky zmizely v oblacích. Mořský vánek přinášel vůni soli a dobrodružství, zatímco mořské vlny šeptaly dávné příběhy.
Plavba podél útesu byla klidná, ale v každé vlně a za každým rohem číhala tajemství. Útesy byly obrostlé starodávnými květinami, kde každá květina nesla plody plné kouzla. Slunce zářilo a malovalo na vodní hladině třpytivé záblesky, které tančily jako hvězdy v noci.
Když loď přistála na bělostném písku pobřeží, Algaar a jeho přátelé vystoupili. Pobřeží vedlo podél lesa, kde stromy šeptaly písně prastaré moudrosti a každý krok zanechával stopy, které mizely jako vzpomínky. Les byl domovem stvoření, která se objevovala jen v noci, a jejich očarované oči sledovaly každého, kdo vstoupil na jejich území.
Cestou se postupně Algaar rozloučil se svými přáteli. Každý z nich měl svou vlastní cestu za plněním císařova úkolu.  Až nakonec Algaar zůstal sám a jeho cesta ho dovedla k malebné rybářské vesničce na pobřeží které se ve večerním slunci třpytilo rudou září.
Jeho kroky byly tiché, jako by se sám přírodní svět kolem něj uklidňoval a naslouchal jeho přítomnosti. Vesničané, kteří zrovna ukončovali své denní práce a chystali se na večerní hostiny, si ho všimli a tiše ho sledovali. Nebylo pochyb, že se před nimi zjevila bytost neobyčejná, drakorozený druid, nesoucí na svých bedrech břímě i čest svého lidu.
Jak vstoupil do vesnice, vítr se zlehka zvedl a šuměl v korunách stromů, jako by šeptal pradávná proroctví a příběhy. Druidův cíl byl jasný, ale cesta před ním skrytá v tajemstvích. Jeho úkol byl svázán s osudem vesnice a každý jeho krok mohl znamenat nový začátek nebo konec.
Zastavil se před vesnicí a jeho hlas, hluboký a melodický, zazněl jako hudba starodávných lesů.


## Hostinec U zlatého lva
velmi zlouhavý text Ah, I see! You want to change the background behind the Leaflet map container itself, not the map tiles. That’s purely CSS for the container or the page. Leaflet maps sit inside a (e.g., #map), so you can style what’s behind it.

## Tržiště
fnsajkfaksjfkajf

## Kovárna
jjhafjfjklajfklaj
`,
  session2: `
# Úvod

<div class="Image_view"
data-img="Images/Elakdet.png,Images/elakdet/domy/dum_1.jpg"
></div>

<div class="Player_Info" id="Sadosu">
Na pobřeží klidného moře, kde se vlny jemně opírají o dřevěné kůly, na kterých stojí domy osady, se odráží poslední paprsky zapadajícího slunce. Osada je jako spleť plovoucích a pevných staveb, spojených dřevěnými lávkami, které se vinou nad tyrkysovou hladinou.
Nad břehem se sklání **vysoká vrba**, jejichž dlouhé větve se jemně dotýkají mořské vody, a vytvářejí tak *tichý tanec* ve večerním vánku. Její stříbřitě zelené listy se třepotají v záři posledních paprsků a dodávají místu poklidnou atmosféru.
Vzduchem se nese vůně mořské soli a čerstvě otesaného dřeva. Mezi domy se občas ozývá zvuk pily či kladiva, jak osadníci stále dokončují některé lodě, ale jinak je vše klidné a tiché. Voda se pod domy zlehka pohupuje, vlnky odplouvají a zase se vracejí, doprovázené tichým šploucháním.
</div>

<div class="Player_Info" id="Krag">
Zatímco slunce klesá k obzoru, osada se hemží činností. Na pobřeží, mezi domy na kůlech a plovoucími plošinami, osadníci zpracovávají svůj denní úlovek z moře. Rybářské sítě, ještě vlhké od slané vody, jsou rozprostřené podél lávek a na hácích visí dlouhé šňůry plné stříbřitých ryb. Vzduch je prosycen vůní mořské soli a čerstvé rybí kůže, která se ve večerním slunci leskne, jakoby byla pokrytá drahokamy.
Někteří osadníci ručně čistí a odstraňují šupiny z velkých kusů, jejich nože se míhají v rychlých, přesných pohybech. Jiní pracují u ohnišť, kde na dřevěných rámech suší jemně prosolené plátky masa. V horku ohně se rybí maso začíná měnit – jeho povrch zlatne, tučnější kusy tiše prskají, a z šupin stoupá jemná vůně kouře, která se šíří po celé osadě.
Mezi lidmi vládne tichá, soustředěná atmosféra, každý má svou roli v procesu. Stříbřitě modré ryby, jejichž těla se ve vlnách ještě před pár hodinami blyštila, teď tvoří zásoby na horší časy – sušené, uzené a připravené k uchování. 
Nedaleko kovárny, kde sálá žár z pece a zvuk kladiva se nese večerním vzduchem, právě Krag spolu se svým přítelem Kentou dokončují stahování zvěře z nedávného lovu. Kovárna, specializující se na bronzové nástroje a zbraně, je místo plné síly, kde se bronz roztéká a tvaruje do podoby ostrých čepelí a pevných nástrojů. Kenta, svalnatý a mohutný stejně jako Krag, pracuje vedle něj, jejich souhra je tichá a efektivní. Masivní ruce Kraga s přesností stahují kůži z uloveného zvířete, zatímco kolem nich se zvedá vůně čerstvé kožešiny a krve.
Zvuky, které se začínají šířit od brány osady, přitahují jejich pozornost. Dav osadníků se shromažďuje, hlasy jsou plné očekávání a vzrušení. Krag se narovná, jeho obrovská postava vrhá dlouhý stín na zem, zatímco Kenta už také odložil své nástroje. Očima si vymění mlčenlivé porozumění – je čas zjistit, kdo způsobil tento rozruch.
Setřou si krev z rukou, krag si přehodí kožešinu přes rameno, a oba se mlčky vydávají směrem k bráně, kde se osadníci tlačí kolem neznámého příchozího, který narušil klidný večer v této osadě.
</div>
<div class="Player_Info" id="Algaar">
Jak slunce začalo zapadat za vzdálené hory, nebe se barvilo do odstínů zlata, růžové a purpurové. Bylo to, jako by se svět chystal ponořit do kouzelného snu. Každý paprsek slunce, který se odrážel od křišťálově čistých řek a jezer, jako by šeptal tajemství starých časů a přísliby nových zázraků.
Ve stínech lesa, kde se větve stromů skláněly jako ochranitelská křídla nad vesnicí, se zjevil druid. Jeho postava byla vysoká a majestátná, s dračími šupinami, které se blyštily jako drahokamy v posledních paprscích denního světla. Jeho oči, hluboké jako temné jezero, hleděly přímo před sebe s klidnou odhodlaností.
Byl vyslancem vládce, pověřený důležitým úkolem. Úkolem, při jehož plnění již urazil dlouhou cestu. 
Jeho cesta začala na palubě lodi, která se vznášela nad vlnami jako labutí peří. Loď, ověnčená zářivými prapory a zdobená zlatými rytinami, plula podél útesu se starodávnou věží tak vysokou, že její vrcholky zmizely v oblacích. Mořský vánek přinášel vůni soli a dobrodružství, zatímco mořské vlny šeptaly dávné příběhy.
Plavba podél útesu byla klidná, ale v každé vlně a za každým rohem číhala tajemství. Útesy byly obrostlé starodávnými květinami, kde každá květina nesla plody plné kouzla. Slunce zářilo a malovalo na vodní hladině třpytivé záblesky, které tančily jako hvězdy v noci.
Když loď přistála na bělostném písku pobřeží, Algaar a jeho přátelé vystoupili. Pobřeží vedlo podél lesa, kde stromy šeptaly písně prastaré moudrosti a každý krok zanechával stopy, které mizely jako vzpomínky. Les byl domovem stvoření, která se objevovala jen v noci, a jejich očarované oči sledovaly každého, kdo vstoupil na jejich území.
Cestou se postupně Algaar rozloučil se svými přáteli. Každý z nich měl svou vlastní cestu za plněním císařova úkolu.  Až nakonec Algaar zůstal sám a jeho cesta ho dovedla k malebné rybářské vesničce na pobřeží které se ve večerním slunci třpytilo rudou září.
Jeho kroky byly tiché, jako by se sám přírodní svět kolem něj uklidňoval a naslouchal jeho přítomnosti. Vesničané, kteří zrovna ukončovali své denní práce a chystali se na večerní hostiny, si ho všimli a tiše ho sledovali. Nebylo pochyb, že se před nimi zjevila bytost neobyčejná, drakorozený druid, nesoucí na svých bedrech břímě i čest svého lidu.
Jak vstoupil do vesnice, vítr se zlehka zvedl a šuměl v korunách stromů, jako by šeptal pradávná proroctví a příběhy. Druidův cíl byl jasný, ale cesta před ním skrytá v tajemstvích. Jeho úkol byl svázán s osudem vesnice a každý jeho krok mohl znamenat nový začátek nebo konec.
Zastavil se před vesnicí a jeho hlas, hluboký a melodický, zazněl jako hudba starodávných lesů.
</div>

---

<div class="Day" data-day="1">
Jak slunce zapadalo, vyděl jsem před sebou brány Elakdetu. Malé rybářské vesnice a sním se i část mého úkolu blížila ke konci.  
I když mě neznámo trochu děsí vešel jsem do vesnice sebevědomě. Velmi rychle se kolem mě udělal hlouček
Skrz hlouček se ke mně dostal vůdce vesnice, Shin Okamota, jeho pozvání k němu domu mi trochu ulevilo, protože to znamenalo že se dostanu dál od shluku vesničanů. U Shina doma jsem předal zprávu se kterou jsem byl vyslán. Pochopitelně se jim moc nelíbila a řekli mi že budu muset zůstat, než se rozhodnou.
<div class="Player_Info" id="Algaar">
Např nějaká moje specifická poznámka, teoreticky lze schovávat podle toho kdo se dívá
</div>

Osama, Shinův syn, mě odvedl do domu kde budu moci v klidu přespat. Jelikož má přítomnost vyvolala takový rozruch rozhodl jsem se jít spát.
</div>

<div class="Day" data-day="2">
Ráno bylo nezáživné, teda do doby než si vůdce svolal celou vesnici a mě si pozval k sobě. Shin začal všem vesničanům přednášet návrh který jsem včera přinesl. Snažil jsem se vedle něj stát sebevědomě, ale cítil jsem se velmi nesvůj. Pohledy vesničanů mě vyváděli trochu z míry.
Po shromáždění jsem se radši co nejrychleji vzdálil od shromáždění. Avšak někdo přece jen šel zamnou. Jak jsem se ohlédl uviděl jsem obra jak hora.  
Působí na mě jako velmi jednoduchý chlap. Představil se jako Krag a nabídl mi, že mě po vesnici provede. Ukázal mi kostel kde jsem vyděl božstva jež uctívají a poté mě vzal na oběd ke Kentovy. Řekl bych že si budeme rozumět.
Tam jsme se potkali s dalšími obyvateli vesnice, modrásek Lyba, velmi tichý člověk Sadosu a elf Tohru. Jelikož plánovali jít mimo vesnici, rozhodl jsem se k nim přidat. Přece jen bude lepší pokud se moc ve vesnici nebudu ukazovat.
Moc jsem neřešil co chtějí, a tak jsme šli za knězem. Ten jim moc nepomohl a tak šli k tamnímu mágovi. Jeho chata byla tak zatuchlá že jsem radši čekal venku.
Pak nás nějaká malá holka zavedla za čarovnou babkou. Ta nás občerstvila a nabídla pomoc výměnou za nějakou službičku.
</div>

<div class="Day" data-day="3">
Další den jsme se opět sešli a vydali se do Zipperdamu. Já šel s nimi ať tam chtěli co tam chtěli. Několik hodin jsme čekali než se Lyba a Tohru vrátí.
Hledali někoho jménem Karim.
Než jsme odešli tak jsem si všiml jak Sadosu dává podivný totem strážnému od nějakého Hakira pro Karima.
</div>

<div class="Day" data-day="4">
Další den jsme se vydali do nedalekých bažin. Cesta byla dlouhá a nezáživná. Na noc jsme se utábořili v sutinách nějakého starého místa. Jestli se s nimi mám vydat dál, tak jsem si potřeboval ověřit zda jim aspoň trochu můžu věřit. Proto jsem se tajně proměnil v žábu a pozoroval jejich reakci. Očividně proti mně nic nemají nebo aspoň ne tak moc a hledali mě. Proto když už bylo jídlo hotové tak jsem se objevil, jakože nic. Noc proběhla v klidu.
</div>

<div class="Day" data-day="5">
Ráno jsme došli na okraj bažiny a připravily rituál. Poté co byly se svým podivným rituálem spokojeni a bažina přijala oběť tak jsme šli hledat kovy do bažin.
</div>

`
};

const NavBAE = {
  "notes": {
    "Locations": {
      "Bronzova Vesnice.md": [],
      "Elakdet.md": [],
      "Zipperdam.md": []
    },
    "NPCs": {
      "Elakdet": {
        "Aimiakira.md": [],
        "Akemiakira.md": [],
        "Akikoishimoto.md": [],
        "Akiraakira.md": [],
        "Amaterasuakira.md": [
          "--DEAD--"
        ],
        "Keiishimoto.md": [],
        "Kentammatsuda.md": [],
        "Naoki.md": [],
        "Osamuokamota.md": [],
        "Shin_Okamota.md": [],
        "Stinovyvestec.md": []
      },
      "Okolí elakdetu": {
        "Azura.md": [
          "--LYBA--"
        ],
        "Carodejka.md": [],
        "Skelgrond.md": [
          "--DEAD--"
        ]
      }
    },
    "Players": {
      "Algaar.md": [],
      "Krag.md": [],
      "Lyba.md": [],
      "Sadosu.md": [],
      "Tohru.md": []
    },
    "Quests": {
      "Ztraceny nahrdelnik.md": []
    },
    "Sessions": {
      "Session 1.md": [],
      "Session 2.md": [],
      "Session 3.md": [],
      "Session_1": {},
      "test.md": []
    }
  }
};

const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

// Fetch and render a Markdown file
function loadMarkdownPageLocal(pageId) {
  const md = markdownPages[pageId];
  parseMarkdown(md);
}

async function loadMarkdownPage(pageId) {
  try {
    const rest = await fetch(pageId);
    if (!rest.ok) throw new Error('Failed to fetch: ' + rest.status);
    const md = await rest.text();
    parseMarkdown(md);
  }
  catch (err) {
    contentEl.innerHTML = '<p>Error loading page: ' + err.message + '</p>';
  }
}

async function start(pageId) {
  try {
    const rest = await fetch(pageId)
  .then(res => res.json())
  .then(data => {
    buildNavBar(data, document.querySelector('.collapsible-list'));
  });
  }
  catch (err) {
    contentEl.innerHTML = '<p>Error loading page: ' + err.message + '</p>';
  }
  setUpEvents();
}

function buildNavBar(folder, parentEl, basePath = '') {
  for (const key in folder) {
    const value = folder[key];
    const li = document.createElement('li');

    if (key.endsWith('.md')) {
      if(testVisibility(value)) {
        continue;
      }
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'note-link';
      const fullPath = `${basePath}/${key}`; // include subfolder path
      a.dataset.path = fullPath;
      if (value.includes("--DEAD--")) {
        a.textContent = key.replace('.md', '') + " ✝";
      }
      else {
        a.textContent = key.replace('.md', '');
      }
      li.appendChild(a);
    } else {   
        if(basePath == '') {
          buildNavBar(value,parentEl ,`${key}`); // recursive with folder path
        }
        else {
          const span = document.createElement('span');
          span.className = 'toggle';
          span.textContent = '▶ ' + key;
          const nested = document.createElement('ul');
          nested.className = 'nested';
          li.appendChild(span);
          li.appendChild(nested);
          buildNavBar(value, nested, `${basePath}/${key}`); // recursive with folder path
        }
    }

    parentEl.appendChild(li);
  }
}


function setUpEvents() {

// Navigation link handling
document.querySelectorAll('.note-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();                // prevent default link navigation
    const pageId = link.dataset.path;    // get which page to load
    loadMarkdownPage(pageId);          // inject into #content
  });
});

document.querySelectorAll('.collapsible-list .toggle').forEach(item => {
  item.addEventListener('click', () => {
    const nested = item.nextElementSibling;
    if (nested) {
      nested.style.display = nested.style.display === 'block' ? 'none' : 'block';

      // Optional: toggle arrow
      item.textContent = item.textContent.startsWith('▶')
        ? item.textContent.replace('▶', '▼')
        : item.textContent.replace('▼', '▶');
    }
  });
});

document.querySelectorAll('.backLink').forEach(roleBtn => {
      roleBtn.addEventListener('click', () => {
        // redirect to your main page with role as query param
        window.location.href = `index.html`;
      });
    });
}

window.addEventListener('resize', updateCarousel);



const urlParams = new URLSearchParams(window.location.search);
const playerRole = urlParams.get('role');

  // Store role globally if needed
window.PLAYER_ROLE = playerRole.replace(/^--|--$/g, '');

const header = document.getElementById('main_header');
let tag = window.PLAYER_ROLE;
header.textContent += " - " + PLAYERS_MAP[window.PLAYER_ROLE];
loadMarkdownPageLocal('session2');
buildNavBar(NavBAE, document.querySelector('.collapsible-list'));
setUpEvents();

//start('source/json/NavBar.json');
