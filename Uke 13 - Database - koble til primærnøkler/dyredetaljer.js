// HTML - elementer. Referanse til html taggene som skal fylles med innhold her
let sykdom = document.querySelector("#sykdom")
let bildecontainer = document.querySelector("#bildecontainer")

// hente URL parameter. Kopier inn denne koden.
var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
console.log(id);

// her lager vi referanser til firebase. Vi har delt inn i hunder og katter, så trenger begge.
// Id er jo primærnøkkelen som følger med lenka fra html fila. Dermed finner vi riktig dyr her!
let db = firebase.database();
let sykdomhund = db.ref("Dyr/Hunder/" + id)
let sykdomkatt = db.ref("Dyr/Katter/" + id)

// Funksjonen som skal lage html koden vår.
function genererHTML(snapshot){
  // snarvei til resultatet av spørringen som kaller på denne funksjonen.
  // da slipper vi å skrive snapshot.val() hvergang vi skal hente noe fra databasen
  let dyr = snapshot.val()

  // her lager vi koden til bildecontainer-tagggen i html fila. må stemme overens med referansen til html elementene øverst i koden
  bildecontainer.innerHTML = `
  <img src="${dyr.Bilde}" alt="">
  `;

  // her lages koden til sykdom-taggen. i html fila. Må stemme overens med referansen øverst i koden
  sykdom.innerHTML = `
  <p>Vi har følgende informasjon: ${dyr.Sykdom}</p>
  `;
}


// Sjekker forbokstaven til key-elementet som følger med når vi kom til denne nettsiden.
// Da vet vi om det er en hund eller katt, og kan hente data fra riktig sted i databasen.
if (id.charAt(0) === "H") {
  sykdomhund.on("value", genererHTML);
}

else if (id.charAt(0) === "K") {
  sykdomkatt.on("value", genererHTML);
}
