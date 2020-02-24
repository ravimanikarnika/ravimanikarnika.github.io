//html referanser
const inpNavn = document.querySelector("#inpNavn");
const inpMeld = document.querySelector("#inpMeld");
const btnMeld = document.querySelector("#btnMeld");
const divMeld = document.querySelector("#meldinger");

// Firestore
const db = firebase.firestore();
const chat = db.collection("chat");

chat.onSnapshot(snapshot => resultat(snapshot));

function resultat(snapshot){
  snapshot.docChanges().forEach((element) => lagHTML(element.doc.data()));
}

function lagHTML(melding){
  divMeld.innerHTML += `
  <section>
    <div class="divFra">${melding["fra"]}:</div>
    <div class="divTekst">${melding["tekst"]}</div>
  <section>
  `
}

function leggTilMeld(){
  chat.add({
    fra: inpNavn.value,
    tekst: inpMeld.value
  })
}
