const originsListEl = document.querySelector('.origins');
const originsForm = document.querySelector('.origin-form');
const destinationsListEl = document.querySelector('.destinations');
const destinationsForm = document.querySelector('.destination-form');
const button = document.querySelector('.plan-trip');
let x = 0;
let n = 0;
const myTrip = document.querySelector('.my-trip');
const altTrip = document.querySelector('.alt-trip');
let startLat = '';
let startLon = '';
let destinationLat = '';
let destinationLon = '';


// start locations
function populateStartList() {
  const originsTextEl = document.getElementById('origin-text');
  const originsText = originsTextEl.value;
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${originsText}.json?limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1Ijoia2xlaXNpbmdlciIsImEiOiJja3hheHlrdWgzdGcxMndvNm41cmdmd3hxIn0.EyjjyGVzqWT68a5pw-IhoQ`)
  .then((response) => response.json())
  .then((data) => {
    const listItem = data.features;
    clearStart(data);
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

  for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', toggleStart);
  };
};

const clearStart = (data) => {
  if (x <= 10) {
    x = 0;
    originsListEl.innerHTML = '';
  };
  clearSelectedStart();
};

function clearSelectedStart() {
  const listItem = document.querySelectorAll('.origins li');
  for (let i = 0; i < listItem.length; i++) {
    listItem[i].classList.remove('selected');
  };
  startLat = '';
  startLon = '';
};

function toggleStart(e) {
  if (!e.currentTarget.classList.contains('selected')) {
    clearSelectedStart();
    e.currentTarget.classList.toggle('selected');
  };
  startLon = e.currentTarget.dataset.long;
  startLat = e.currentTarget.dataset.lat;
};


// destination locations
function populateDestinationList() {
  const destinationsTextEl = document.getElementById('destination-text');
  const destinationsText = destinationsTextEl.value;
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${destinationsText}.json?limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1Ijoia2xlaXNpbmdlciIsImEiOiJja3hheHlrdWgzdGcxMndvNm41cmdmd3hxIn0.EyjjyGVzqWT68a5pw-IhoQ`)
  .then((response) => response.json())
  .then((data) => {
    const listItem = data.features;
    clearDestination(data);
    listItem.forEach(location => {
      buildDestinationList(data);
      x++;
    });
  });
};

const buildDestinationList = (data) => { 
  let features = data.features[x];
  let locationID = data.features[x].id;
  let locationLat = data.features[x].center[0];
  let locationLon = data.features[x].center[1];
  let locationName = data.features[x].text;
  let locationArr = data.features[x].context;
  let place = (locationArr.find(isPlace)).text;
  let poiAddress = data.features[x].properties.address; // this is poi only
  const listItems = document.querySelectorAll('.destinations li');

  if (locationID.includes('poi')) {
    if(!poiAddress) {
      destinationsListEl.insertAdjacentHTML(
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
      destinationsListEl.insertAdjacentHTML(
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
      destinationsListEl.insertAdjacentHTML(
        'beforeend',
        `
        <li data-long="${locationLon}" data-lat="${locationLat}" class="">
          <div class="name">${locationName}</div>
          <div>${place}</div>
        </li>
        `
      );
    } if (features.address) {
      destinationsListEl.insertAdjacentHTML(
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
    destinationsListEl.insertAdjacentHTML(
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
    destinationsListEl.insertAdjacentHTML(
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
    destinationsListEl.insertAdjacentHTML(
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
    destinationsListEl.insertAdjacentHTML(
      'beforeend',
      `
      <li data-long="${locationLon}" data-lat="${locationLat}" class="">
        <div class="name">${locationName}</div>
        <div>${place}</div>
      </li>
      `
    );
  };

  for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', toggleDestination);
  };
};

const clearDestination = (data) => {
  if (x <= 10) {
    x = 0;
    destinationsListEl.innerHTML = '';
  };
  clearSelectedDestination();
};

function clearSelectedDestination() {
  const listItem = document.querySelectorAll('.destinations li');
  for (let i = 0; i < listItem.length; i++) {
    listItem[i].classList.remove('selected');
  };
  destinationLat = '';
  destinationLon = '';
};

function toggleDestination(e) {
  if (!e.currentTarget.classList.contains('selected')) {
    clearSelectedDestination();
    e.currentTarget.classList.toggle('selected');
  };
  destinationLon = e.currentTarget.dataset.long;
  destinationLat = e.currentTarget.dataset.lat;
};


// trip
function populateTrip(data) {
  fetch(`https://api.winnipegtransit.com/v3/trip-planner.json?api-key=gvGXRfVSUPPqR5oWAsWr&origin=geo/${startLon},${startLat}&destination=geo/${destinationLon},${destinationLat}`)
  .then((response) => response.json())
  .then((data) => {
    const tripPlans = data.plans[0].segments;
    clearTrip()
    tripPlans.forEach(segment => {
      buildTripList(data);
      n++;
    })
  })
  .catch((err) => {
    clearTrip();
    myTrip.insertAdjacentHTML(
      'beforeend',
      `
      <li>
          <p> Please ensure you have selected a unique starting location and destination.</p>
      </li>
      <li>
        <p> If the start and end locations are different, there are no available buses at this time. </p>
      </li>
      `
    );
  });
};

const buildTripList = (data) => {
  let segment = data.plans[0].segments[n];
  let type = toCapital(data.plans[0].segments[n].type);
  let totalTime = data.plans[0].segments[n].times.durations.total;
 
  if (segment.type === 'walk') {
    
    if(!segment.to.stop) {
      myTrip.insertAdjacentHTML(
        `beforeend`,
        `
        <li>
          <i class="fas fa-walking" aria-hidden="true"></i>${type} for ${totalTime} minutes
          to your destination.
        </li>
        `
      )
      return;
    }
    if(segment.to.stop) {
      let stopNumber = data.plans[0].segments[n].to.stop.key;
      let to = data.plans[0].segments[n].to.stop.name;
      myTrip.insertAdjacentHTML(
        `beforeend`,
        `
        <li>
          <i class="fas fa-walking" aria-hidden="true"></i>${type} for ${totalTime} minutes
          to #${stopNumber} - ${to}
        </li>
        `
      )
      return;
    }
  }

  if (segment.type === 'ride') {
    let route = data.plans[0].segments[n].route.name;
    myTrip.insertAdjacentHTML(
      `beforeend`,
      `
      <li>
        <i class="fas fa-bus" aria-hidden="true"></i>${type} the ${route} for ${totalTime} minutes.
      </li>
      `
    )
  }

  if (segment.type === 'transfer') {
    let oldStopNumber = data.plans[0].segments[n].from.stop.key;
    let oldBus = data.plans[0].segments[n].from.stop.name;
    let newStopNumber = data.plans[0].segments[n].to.stop.key;
    let newBus = data.plans[0].segments[n].to.stop.name;

    myTrip.insertAdjacentHTML(
      `beforeend`,
      `
      <li>
      <i class="fas fa-ticket-alt" aria-hidden="true"></i>${type} from stop
      #${oldStopNumber} - ${oldBus} to stop #${newStopNumber} - ${newBus}
    </li>
      `
    );
  };
};

const clearTrip = (data) => {
  n = 0;
  myTrip.innerHTML = '';
};

// alt trip

function populateAltTrip(data) {
  fetch(`https://api.winnipegtransit.com/v3/trip-planner.json?api-key=gvGXRfVSUPPqR5oWAsWr&origin=geo/${startLon},${startLat}&destination=geo/${destinationLon},${destinationLat}`)
  .then((response) => response.json())
  .then((data) => {
    const tripPlans = data.plans[1].segments
    clearAltTrip()
    tripPlans.forEach(segment => {
      buildAltTripList(data);
      n++;
    });
  })
  .catch((err) => {
    clearAltTrip()
    altTrip.insertAdjacentHTML(
      'beforeend',
      `
      <li>
          <p> There are no alternative routes available. </p>
      </li>
     
      `
    );
  });
};

const buildAltTripList = (data) => {
  let segment = data.plans[1].segments[n];
  let type = toCapital(data.plans[1].segments[n].type);
  let totalTime = data.plans[1].segments[n].times.durations.total;
 


  if (segment.type === 'walk') {
    
    if(!segment.to.stop) {
      altTrip.insertAdjacentHTML(
        `beforeend`,
        `
        <li>
          <i class="fas fa-walking" aria-hidden="true"></i>${type} for ${totalTime} minutes
          to your destination.
        </li>
        `
      );
      return;
    };
    if(segment.to.stop) {
      let stopNumber = data.plans[1].segments[n].to.stop.key;
      let to = data.plans[0].segments[n].to.stop.name;
      altTrip.insertAdjacentHTML(
        `beforeend`,
        `
        <li>
          <i class="fas fa-walking" aria-hidden="true"></i>${type} for ${totalTime} minutes
          to #${stopNumber} - ${to}
        </li>
        `
      );
      return;
    };
  };

  if (segment.type === 'ride') {
    let route = data.plans[1].segments[n].route.name;
    altTrip.insertAdjacentHTML(
      `beforeend`,
      `
      <li>
        <i class="fas fa-bus" aria-hidden="true"></i>${type} the ${route} for ${totalTime} minutes.
      </li>
      `
    );
  };

  if (segment.type === 'transfer') {
    let oldStopNumber = data.plans[1].segments[n].from.stop.key;
    let oldBus = data.plans[1].segments[n].from.stop.name;
    let newStopNumber = data.plans[1].segments[n].to.stop.key;
    let newBus = data.plans[1].segments[n].to.stop.name;

    altTrip.insertAdjacentHTML(
      `beforeend`,
      `
      <li>
      <i class="fas fa-ticket-alt" aria-hidden="true"></i>${type} from stop
      #${oldStopNumber} - ${oldBus} to stop #${newStopNumber} - ${newBus}
    </li>
      `
    );
  };
};

const clearAltTrip = (data) => {
  n = 0;
  altTrip.innerHTML = '';
};

// utility functions
function isPlace (place) {
  return place.id.includes('place');
};

function toCapital (s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// event listeners
originsForm.addEventListener('submit', e => {
  e.preventDefault();
  populateStartList();
});

destinationsForm.addEventListener('submit', e => {
  e.preventDefault();
  populateDestinationList();
});

button.addEventListener('click', e => {
  e.preventDefault();
  populateTrip();
  populateAltTrip();
});

