//Database
const main = document.querySelector("main")

//URL-parameter
var url_string = window.location.href
var url = new URL(url_string);
var Navn = url.searchParams.get("Navn");

Navn = Navn.toLowerCase();

//Legger innhold til main
function visHTML() {
    main.innerHTML = `
        <article class="tfk">Takk for at du kjøpte ${Navn} hos oss!</article>
    `;
}
visHTML();