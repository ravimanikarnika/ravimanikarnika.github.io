//HTML-elementer
const overviewLeft = document.querySelector(".overviewLeft");
const overviewRight = document.querySelector(".overviewRight");
const overviewBottom = document.querySelector(".overviewBottom");

//URL-parameter
var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
var pris = url.searchParams.get("pris");

//Database-elementer
const database = firebase.database();
const dyrene = database.ref("Dyrebakken/Varer/Dyr/" + id);
const tingene = database.ref("Dyrebakken/Varer/Ting/" + id);

//Legger innhold til main
function byttBilde(bilde) {
  bildecontainer.style.backgroundImage = `url("${bilde}")`;
}

function visVare(snap) {
  const vare = snap.val();

  const bilder = vare.Bilder;
  const visningsbilde = bilder[4];

  bildecontainer.style.backgroundImage = `url("${visningsbilde}")`;

  let bilderad = `<div class="bilderad">`;

  for (const bilde of bilder) {
    bilderad += `<img src="${bilde}" onClick="byttBilde('${bilde}')">`
  }

  bilderad += `</div>`;


  const orginalPris = `${vare.Pris}`

  const varenummer = Math.floor(Math.random() * 100000);

  overviewLeft.innerHTML += `
      <section class="overviewLeftTxt">
        <h1 class="overviewContent">${vare.Navn}</h1>
        <div class="overviewContent">varenummer: ${varenummer}</div>
      </section>
      `;
  overviewRight.innerHTML = `
      <section>
        <p class="strikeThrough">Før ${orginalPris},-</p>
        <p class="nyPris">${pris},-</p>
        ${bilderad}
        <form>
          <input type="button" value="Kjøp vare" class="purchaseButton" onclick="window.location.href='TFK.html?Navn=${vare.Navn}'"></input>
        </form>
      </section>
    `;  
  overviewBottom.innerHTML = `
      <section>
        <h1 class="overviewContent">Produkt informasjon</h1>
        <p class="overviewContent">${vare.Beskrivelse}</p>
      </section>
    `;

  // Dersom det ikke er noen forskjell mellom gammel og ny pris skal den gamle prisen ikke vises
  if (orginalPris == pris) {
    overviewRight.innerHTML = "";
    overviewRight.innerHTML += `
        <section>
          <p class="nyPris">${pris},-</p>
          ${bilderad}
          <form>
            <input type="button" value="Kjøp vare" class="purchaseButton" onclick="window.location.href='TFK.html?Navn=${vare.Navn}'"></input>
          </form>
        </section>
      `;
  }
}

//Event Listener
dyrene.on("value", visVare);
tingene.on("value", visVare);
