const originsListEl = document.querySelector('.origins');
const originsForm = document.querySelector('.origin-form');


function populateStartList() {
  const originsTextEl = document.getElementById('origin-text');
  const originsText = originsTextEl.value;
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${originsText}.json?limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1Ijoia2xlaXNpbmdlciIsImEiOiJja3hheHlrdWgzdGcxMndvNm41cmdmd3hxIn0.EyjjyGVzqWT68a5pw-IhoQ`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  });
};


originsForm.addEventListener('submit', e => {
  e.preventDefault();
  populateStartList();
});