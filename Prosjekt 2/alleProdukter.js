//Database-Elementer
const database = firebase.database();
const dyrene = database.ref("Dyrebakken/Varer/Dyr/");
const tingene = database.ref("Dyrebakken/Varer/Ting/");
const varer = database.ref("Dyrebakken/Varer/Alt/");

//HTML-Elementer
const allDisplay = document.querySelector(".allDisplay");

//Legger innhold til main
function visVare(snap) {
  const key = snap.key;
  const vare = snap.val();

  let index = 4;

  let pris = `${vare.Pris}`

  allDisplay.innerHTML += `
      <section class="productSection">
        <h1>${vare.Navn}</h1>
        <a href="produkt.html?id=${key}&pris=${pris}"><img src="${vare.Bilder[index]}"></a>
        <p class="nyPris" id="egPris">${pris},-</p>
        <a href="produkt.html?id=${key}&pris=${pris}" class="purchaseLink">Se mer</a>
      </section>
    `;
}

function visDyrNavn() {
  allDisplay.innerHTML = "";
  dyrene.orderByChild("Navn").on("child_added", visVare);
}

function visDyrPris() {
  allDisplay.innerHTML = "";
  dyrene.orderByChild("Pris").on("child_added", visVare);
}

function visTingNavn() {
  allDisplay.innerHTML = "";
  tingene.orderByChild("Navn").on("child_added", visVare);
}

function visTingPris() {
  allDisplay.innerHTML = "";
  tingene.orderByChild("Pris").on("child_added", visVare);
}

function visAltPris() {
  allDisplay.innerHTML = "";
  varer.orderByChild("Pris").on("child_added", visVare);
}

function visAltNavn() {
  allDisplay.innerHTML = "";
  varer.orderByChild("Navn").on("child_added", visVare);
}

//Event-Listeners
dyrene.on("child_added", visVare)
tingene.on("child_added", visVare)