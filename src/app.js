const originsListEl = document.querySelector('.origins');
const originsForm = document.querySelector('.origin-form');
let x = 0;


function populateStartList() {
  const originsTextEl = document.getElementById('origin-text');
  const originsText = originsTextEl.value;
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${originsText}.json?limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1Ijoia2xlaXNpbmdlciIsImEiOiJja3hheHlrdWgzdGcxMndvNm41cmdmd3hxIn0.EyjjyGVzqWT68a5pw-IhoQ`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    clearStart(data);
    const listItem = data.features;
    listItem.forEach(location => {
      buildStartList(data);
      x++;
    });
  });
};

const buildStartList = (data) => { 
  let features = data.features[x];
  let locationID = data.features[x].id;
  let locationLat = data.features[x].center[0];
  let locationLon = data.features[x].center[1];
  let locationName = data.features[x].text;
  let locationArr = data.features[x].context;
  let place = (locationArr.find(isPlace)).text;
  let poiAddress = data.features[x].properties.address;
  const listItems = document.querySelectorAll('.origins li');

  if (locationID.includes('poi')) {
    if(!poiAddress) {
      originsListEl.insertAdjacentHTML(
        'beforeend',
        `
        <li data-long="${locationLon}" data-lat="${locationLat}" class="">
          <div class="name">${locationName}</div>
          <div>${place}</div>
        </li>
        `
      );
    };
    if (poiAddress) {
      originsListEl.insertAdjacentHTML(
        'beforeend',
        `
        <li data-long="${locationLon}" data-lat="${locationLat}" class="">
          <div class="name">${locationName}</div>
          <div>${poiAddress}</div>
        </li>
        `
      );
    };
  };

  if (locationID.includes('address')) {
    let locationAddress = data.features[x].address;
    if(!features.address) {
      originsListEl.insertAdjacentHTML(
        'beforeend',
        `
        <li data-long="${locationLon}" data-lat="${locationLat}" class="">
          <div class="name">${locationName}</div>
          <div>${place}</div>
        </li>
        `
      );
    } if (features.address) {
        originsListEl.insertAdjacentHTML(
        'beforeend',
        `
        <li data-long="${locationLon}" data-lat="${locationLat}" class="">
          <div class="name">${locationAddress} ${locationName}</div>
          <div>${place}</div>
        </li>
        `
      );
    };
  };

  if (locationID.includes('neighborhood')) {
    originsListEl.insertAdjacentHTML(
      'beforeend',
      `
      <li data-long="${locationLon}" data-lat="${locationLat}" class="">
        <div class="name">${locationName}</div>
        <div>${place}</div>
      </li>
      `
    );
  };

  if (locationID.includes('locality')) {
    originsListEl.insertAdjacentHTML(
      'beforeend',
      `
      <li data-long="${locationLon}" data-lat="${locationLat}" class="">
        <div class="name">${locationName}</div>
        <div>${place}</div>
      </li>
      `
    );
  };

  if (locationID.includes('place')) {
    originsListEl.insertAdjacentHTML(
      'beforeend',
      `
      <li data-long="${locationLon}" data-lat="${locationLat}" class="">
        <div class="name">${locationName}</div>
        <div>${place}</div>
      </li>
      `
    );
  };

  if (locationID.includes('postcode')) {
    originsListEl.insertAdjacentHTML(
      'beforeend',
      `
      <li data-long="${locationLon}" data-lat="${locationLat}" class="">
        <div class="name">${locationName}</div>
        <div>${place}</div>
      </li>
      `
    );
  };
  ////////
};

const clearStart = (data) => {
  if (x <= 10) {
    x = 0;
    originsListEl.innerHTML = '';
  };
};




function isPlace (place) {
  return place.id.includes('place');
};

originsForm.addEventListener('submit', e => {
  e.preventDefault();
  populateStartList();
});