# Rise-of-the-Empire
Repo pro verzování poznámek a jejich vizualizaci
## Použití
Pro vytvoření poznámky, záznamu z kampaně, či NPC a dalších... Stačí vytvořit soubor s koncovkou .md v příslušné složce.
Všechny poznámky lze najít ve složce notes.
Po vytvoření souboru lze udělat jednu ze dvou variant:
1. Uložit soubor a dát o tom vědět na serveru. Já poté přegeneruju soubor NavBar.json který dělá vizualizaci navigačního menu
2. Uložíte soubor a poté v source/json/NavBar.json ručně dopíšete do stromové struktury váš nový soubor. Nedoporučovaná varianta

> [!CAUTION] Důležité
> Projevení změn není okamžité, a změna navigačního menu bude po oznámení většinou prováděna v noci.

### Obrázky:
v určitých místech lze přidávat obrázky v takovém případě je nutné jejich správně zapsání. Obrázky budou ukládány ve složce Images.
> [!NOTE] Zápis
> Standartní cesta by tedy byla:
> ```
> Images/složka_A/složka_B/můj_obrazek.png
> ```
 > Bude stačit pokud zapíšete:
> ```
> složka_A/složka_B/můj_obrazek.png
> ```

## Předlohy formátovaných bloků
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