# Sp�rringer i firebase

Sp�rringer brukes til � hente ut data fra databaser.
I firebase gj�res sp�rringer ved innebygde sp�rrefunksjoner.
Skrivem�te:
~~~~
databaseRef.sp�rrefunksjon();
~~~~

## Sp�rrefunksjonen .on();

I IT1 bruker vi sp�rrefunksjonen ``.on();``.
Skrivem�te:
~~~~
databaseRef.on("hendelseslytter",javascriptFunksjon);
~~~~

.on-funksjonen tar inn to argumenter, det f�rste er en *hendelseslytter* og det andre er en javascript-funksjon.
Funksjonen "lytter" etter en spesiell hendelse i databasen, n�r den hendelsen skjer utf�res javascript-funksjonen.
For eksmpel vil hendelseslytteren ``"child_added"`` "lytte" etter nye oppf�ringen i databasen, og n�r en ny oppf�ring blir lagt til kj�res en javascript-funksjon.
Javascripten-funksjonen kan for eksempel v�re en funksjon som skriver ut den nye oppf�ringen p� nettsiden.
Tabellen under viser en oversikt over de tre mest brukte lytterne i IT1.

|Hendelseslyttere|Lytter etter|
|--------------------|--------|
|``onChildAdded``    |nye oppf�ringer som legges til|
|``onChildRemoved``|oppf�ringer som fjernes|
|``onChildChanged``|data som endres|

Eksempler p� sp�rringer:
~~~~
sko.on("child_added",visVare); 
/* Over er en sp�rring som lytter til nye oppf�ringer i databasen, hvis hendelsen skjer kj�res funksjonen visVare.
N�r nettsiden lastes inn g�r den gjennom hver oppf�ring i databasen og kj�rer funksjonen visVare
p� hver oppf�ring. */

            
jakker.on("child_added",visVare); // Samme som sp�rrefunksjonen over, bare med jakker.
~~~~

## Sorteringsfunksjoner

N�r en arbeider med databaser som inneholder veldig mye data blir det fort ganske voldsomt � hente ut all dataen som er oppf�rt i databasen.
Derfor gj�res ofte sp�rringer til databasen som ber om bare deler av dataen.
For eksempel p� nettsider vil en gjerne bare hente ut data som skal vises p� nettsiden.

For � hente ut deler av dataen i en firebase-database brukes sorteringsfunksjoner kombinert med en sp�rrefunksjon.
Skrivem�te:
~~~~~
databaseRef.sorteringsfunksjon().sp�rrefunksjon();
~~~~~
Det er ogs� mulig � kombinere flere sorteringsfunksjoner med en sp�rrefunksjon, da skriver vi gjerne funksjonene under hverandre slik:
~~~~~
databaseRef
    .sorteringsfunksjon1()
    .sorteringsfunksjon2()
    .sorteringsfunksjon3()
    .sp�rrefunksjon();
~~~~~~

Tabellen under viser en oversikt over sorteringsfunksjoner i firebase.
Det finner mange flere innebygde sorteringsfunksjoner i firebase, en oversikt over alle finnes i [dokumentasjonen](https://firebase.google.com/docs/reference/android/com/google/firebase/database/Query) til firebase.

|Sorteringsfunksjoner|Funksjon|
|--------------------|--------|
|``.limitToFirst(n)``    |Hent ut de *n* f�rste|
|``.limitToLast(n)``     |Hent ut de *n* siste|
|``.startAt(verdi)``|Hent ut alle som starter p� en bestemt verdi|
|``.endAt(verdi)``|Hent ut alle som slutter p� en bestemt verdi|
|``.equalTo(verdi)``|Hent ut alle som er lik en verdi|

Eksempler p� sp�rringer med sorteringsfunksjoner:
~~~~~
// Sp�rring som sorterer sko etter pris, laveste f�rst
sko
    .orderByChild("pris")
    .on("child_added",visVare);

// Sp�rring som sorterer sko etter pris laveste f�rst, og gir de tre billigste skoene 
sko
    .orderByChild("pris")
    .limitToFirst(3)
    .on("child_added",visVare);

// Sp�rring som gir alle sko med pris mellom 1800 og 2200, sortert etter pris.
sko
    .orderByChild("pris")
    .startAt(1800)
    .endAt(2200)
    .on("child_added",visVare);
~~~~~

## Eksempel - Nettbutikk

Database (JSON):
~~~~
{
    "varer":{
        "sko":{
            "sko001":{
                "merke":"Nike",
                "modell":"Air Max 97",
                "pris":1849
            },
            "sko002":{
                "merke":"Nike",
                "modell":"Air VaporMax",
                "pris":2049
            },
            "sko003":{
                "merke":"Adidas",
                "modell":"Yeezy Boost 700 v2",
                "pris":2950
            }
        },
        "jakker":{
            "jakke001":{
                "merke":"Supreme x The North Face",
                "modell":"Expedition Jacket",
                "pris":2800
            }
        }
    }
}
~~~~

Sp�rringer til databasen (HTML og javascript)
~~~~



<!DOCTYPE html>
<html lang="nb">
    <head>
        <meta charset="UTF-8">
        <title>Nettbutikk</title>
        <!--Lim inn kode fra firebase her-->
    </head>
    <body>
        
        <main>
            
        </main>

        <script>
            const main = document.querySelector("main"); // Variabel som referer til mian-elementet

            // Referanser til databasen
            const db = firebase.database();
            const sko = db.ref("varer/sko"); // Referer til alt som ligger under sko i databasen
            const jakker = db.ref("varer/jakker"); // Referer til alt som ligger under jakker i databasen

            function visVare(snapshot){
                //Javascript-funksjon som skriver varene ut p� nettsiden i main-elementet
                let vare = snapshot.val();
                main.innerHTML +=`
                    <article class="vare">
                        <h1>${vare.merke} - ${vare.modell}</h1>
                        <p>Pris: ${vare.pris}</p>
                    </article>
                `
            }

            sko.on("child_added",visVare); // Sp�rring som lytter til nye oppf�ringer i databasen, hvis det skjer kj�res funksjonen visVare.
                                        // N�r nettsiden lastes inn g�r den gjennom hver oppf�ring i databasen og kj�rer funksjonen visVare
                                        // p� hver oppf�ring.
            
            jakker.on("child_added",visVare); // Samme som sp�rrefunksjonen over, bare med jakker.


            // Sp�rring som sorterer sko etter pris, laveste f�rst
            sko
                .orderByChild("pris")
                .on("child_added",visVare);

            // Sp�rring som sorterer sko etter pris laveste f�rst, og gir de tre billigste skoene 
            sko
                .orderByChild("pris")
                .limitToFirst(3)
                .on("child_added",visVare);

            // Sp�rring som gir alle sko med pris mellom 1800 og 2200, sortert etter pris.
            sko
                .orderByChild("pris")
                .startAt(1800)
                .endAt(2200)
                .on("child_added",visVare);
        </script>
    </body>
</html>
~~~~


## Les mer
Kode 1 - kapittel 8  
[Firebase-dokumentasjon](https://firebase.google.com/docs/reference/android/com/google/firebase/database/package-summary)  
[Firebase Database Querying 101 (YT)](https://www.youtube.com/watch?v=3WTQZV5-roY&list=PLl-K7zZEs