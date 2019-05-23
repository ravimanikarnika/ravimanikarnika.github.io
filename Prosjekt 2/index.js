//Database-Elementer
const database = firebase.database();
const dyrene = database.ref("Dyrebakken/Varer/Dyr/");
const tingene = database.ref("Dyrebakken/Varer/Ting/");

//HTML-Elementer
const display = document.querySelector(".display");

//Legger innhold til main
function visVare(snap) {
  const key = snap.key;
  const vare = snap.val();

  let index = 4; // Tilfeldig farge er teit - Math.floor(Math.random() * 5);
  let rabatt = 1 - (Math.floor(Math.random() * 15) / 20);
  let orginalPris = `${vare.Pris}`
  let prisDecider = `${vare.Pris}` * rabatt;
  let pris = Math.round(prisDecider);


  if (orginalPris == pris) {
    pris *= 0.9;
  }


  display.innerHTML += `
      <section class="productSection">
        <h1>${vare.Navn}</h1>
        <a href="produkt.html?id=${key}&pris=${pris}"><img src="${vare.Bilder[index]}"></a>
        <p class="strikeThrough">Før ${orginalPris},-</p>
        <p class="nyPris">${pris},-</p>
        <a href="produkt.html?id=${key}&pris=${pris}" class="purchaseLink">Se mer</a>
      </section>
    `;
}


//Event-Listeners
dyrene.limitToFirst(3).on("child_added", visVare)
tingene.limitToFirst(3).on("child_added", visVare)


//Bildeslide skript
var i = 0;
var antallBilder = 9;
let bilder = ["Bilder/Slide_bilde_0.png", "Bilder/Slide_bilde_1.png", "Bilder/Slide_bilde_2.png", "Bilder/Slide_bilde_3.png", "Bilder/Slide_bilde_4.png", "Bilder/Slide_bilde_5.png", "Bilder/Slide_bilde_6.png", "Bilder/Slide_bilde_7.png", "Bilder/Slide_bilde_8.png"];

function forhåndslastBilder(array) {
  if (!forhåndslastBilder.list) {
    forhåndslastBilder.list = [];
  }
  var list = forhåndslastBilder.list;
  for (var i = 0; i < array.length; i++) {
    var img = new Image();
    img.onload = function () {
      var index = list.indexOf(this);
    }
    list.push(img);
    img.src = array[i];
  }
}

forhåndslastBilder(bilder);

function runSlides() {
  let bildeSlide = document.querySelector(".bildeSlide");

  bildeSlide.innerHTML = `
    <p class="bildeCounter">${i+1}/${antallBilder}</p>
    <img src="${bilder[i]}"> 
    `;

  i++;

  if (i == antallBilder) {
    i = 0;
  }

  setTimeout(runSlides, 3000);

}

runSlides();