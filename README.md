# Rise-of-the-Empire
web: https://jakpik.github.io/Rise-of-the-Empire/
## Použití
Pro vytvoření poznámky, záznamu z kampaně, či NPC a dalších... Stačí vytvořit soubor s koncovkou .md v příslušné složce.
Všechny poznámky lze najít ve složce notes.
Po vytvoření souboru lze udělat jednu ze dvou variant:
1. Uložit soubor a dát o tom vědět na serveru. Já poté přegeneruju soubor NavBar.json který dělá vizualizaci navigačního menu
2. Uložíte soubor a poté v source/json/NavBar.json ručně dopíšete do stromové struktury váš nový soubor. Nedoporučovaná varianta
   
> Důležité <br>
> Projevení změn není okamžité, a změna navigačního menu bude po oznámení většinou prováděna v noci.

### Obrázky:
v určitých místech lze přidávat obrázky v takovém případě je nutné jejich správně zapsání. Lze přidat více obrázků, stačí je zapsat a rozdělovat pomocí čárky. Obrázky budou ukládány ve složce Images.
> Zápis cesty:
> ```
> Images/složka_A/složka_B/můj_obrazek.png
> ```
> Více obrázků:
>```
> Images/složka_A/složka_B/můj_obrazek.png, Images/složka/obr.jpg
> ```

### Viditelnost a efekty
Lze přidávat tagy viditelnosti, např. --LYBA-- <br>
Tagy efektu:
<table>
  <tr>
    <td><img src="Images/icons/dead.png" width="80"></td>
    <td><strong>--DEAD--</strong><br>Pro postavy, které zemřeli</td>
  </tr>
  <tr>
    <td><img src="Images/icons/craftsman.png" width="80"></td>
    <td><strong>--CRAFTSMAN--</strong><br>Řemeslnící</td>
  </tr>
  <tr>
    <td><img src="Images/icons/cursed.png" width="80"></td>
    <td><strong>--CURSED--</strong><br>Prokletí jakéhokoliv typu</td>
  </tr>
  <tr>
    <td><img src="Images/icons/divine.png" width="80"></td>
    <td><strong>--DIVINE--</strong><br>Bohové, polobohové, božské bytosti</td>
  </tr>
  <tr>
    <td><img src="Images/icons/guard.png" width="80"></td>
    <td><strong>--GUARD--</strong><br>Strážní, vojáci</td>
  </tr>
  <tr>
    <td><img src="Images/icons/healer.png" width="80"></td>
    <td><strong>--HEALER--</strong><br>Léčitelé</td>
  </tr>
  <tr>
    <td><img src="Images/icons/magic.png" width="80"></td>
    <td><strong>--MAGIC--</strong><br>Pro postavy s magickými schopnostmi</td>
  </tr>
  <tr>
    <td><img src="Images/icons/merchant.png" width="80"></td>
    <td><strong>--MERCHANT--</strong><br>Obchodníci</td>
  </tr>
  <tr>
    <td><img src="Images/icons/missing.png" width="80"></td>
    <td><strong>--MISSING--</strong><br>Ztracené postavy</td>
  </tr>
  <tr>
    <td><img src="Images/icons/noble.png" width="80"></td>
    <td><strong>--NOBLE--</strong><br>Šlechtici, výše postavení obyvatelé</td>
  </tr>
  <tr>
    <td><img src="Images/icons/rogue.png" width="80"></td>
    <td><strong>--ROGUE--</strong><br></td>
  </tr>
  <tr>
    <td><img src="Images/icons/scholar.png" width="80"></td>
    <td><strong>--SCHOLAR--</strong><br>Učenec, vzdělaná osoba</td>
  </tr>
  <tr>
    <td><img src="Images/icons/undead.png" width="80"></td>
    <td><strong>--UNDEAD--</strong><br></td>
  </tr>
  <tr>
    <td><img src="Images/icons/warrior.png" width="80"></td>
    <td><strong>--WARRIOR--</strong><br>Válečník</td>
  </tr>
</table>

## Předlohy formátovaných bloků
### Obrázek volně v .md
``` html
<div class="Image_view" style="height: 200px;"
data-img="Images/Elakdet.png,Images/elakdet/domy/dum_11.jpg"
></div>
```
### Player box
``` html
<div class="Player_Info" id="Jmeno hrace">
Odstavec 1
Odstavec 2
</div>
```
### Day tag
``` html
<div class="Day" data-day="1">
    text / jiné tagy
</div>
```
### Lokace
``` html
<div class="Location"
data-name="Nadpis - název lokace"
data-info="Informace o dané lokaci
lze psát na více řádků doku je vše v uvozovkách."
data-img="cesta k obrázku"
data-buildings="
budova 1: dlouhý popis budovy,
budova 2,
budova 3: další popis
"
></div>
```

### NPC
``` html
<div class="NPC"
data-name="Jméno Postavy"
data-race="Rasa"
data-profession="Profese"
data-age="Věk"
data-location="Lokace kde přebývá"
data-info="Informace o postavě"
data-description="Popis postavy"
data-tasks="Seznam úkolů"
data-img="cesta k obrázku"
></div>
```



### Quest
``` html
<div class="Quest"
data-name="Název úkolu"
data-who="Kdo byl zadavatel"
data-where="Kde jsme úkol získalí"
data-reward="Odměna"
data-deadline="Časové omezení do kdy"
data-status="Probíhající"
data-description="Popis questu a veškeré důležité info"
></div>
```
> [!TIP] Stavy
>  - Probíhající
>  - Odložený
>  - Splněný
>  - Propadlý - lze splnit, ale...
>  - Zrušený - už není nutné plnit