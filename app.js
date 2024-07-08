require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/tasks/Locator"
], function (Map, MapView, Graphic, GraphicsLayer, Locator) {
  // Creating a Map object
  const map = new Map({
    basemap: "streets-navigation-vector"
  });

  // Creating a MapView associated to the div container (index.html)
  const view = new MapView({
    container: "mapView",
    map: map,
    center: [-40, 30], // Longitude, latitude
    zoom: 2
  });

  // Layer to store the City markers
  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  // Layer for cities from localStorage
  const localStorageLayer = new GraphicsLayer();
  map.add(localStorageLayer);

  // Fetch the JSON data from the URL
  fetch('https://raw.githubusercontent.com/bykarol/arcgis-js/main/data/data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(cities => {
      cities.forEach(city => {
        city.fromLocalStorage = false; // Marking fetched cities as not from localStorage
        addCityToMap(city);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Failed to fetch city data from server.');
    });

  // Event handler for form submission
  const cityForm = document.getElementById('addCityForm');
  // Geocoding service
  const locator = new Locator({
    url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  });

  cityForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityName = event.target['cityName'].value;
    const visitDate = event.target['visitDate'].value;
    const impressions = event.target['impressions'].value;
    const suggestions = event.target['suggestions'].value;

    // Geocoding the name of the city to obtain its coordinates
    locator.addressToLocations({
      address: {
        "SingleLine": cityName
      },
      maxLocations: 1
    }).then((results) => {
      if (results.length > 0) {
        const cityCoords = [results[0].location.x, results[0].location.y];

        const newCity = {
          name: cityName,
          coordinates: cityCoords,
          dateVisited: visitDate,
          impressions: impressions,
          suggestions: suggestions
        };

        // Save new city to localStorage
        saveCity(newCity);

        // Add new city to map
        newCity.fromLocalStorage = true;
        addCityToMap(newCity);

        // Reset the form
        cityForm.reset();
      } else {
        alert("City not found!");
      }
    }).catch((error) => {
      console.error(error);
      alert("An error occurred while geocoding the city.");
    });
  });

  // Function to save city to localStorage
  function saveCity(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
  }

  // Function to load cities from localStorage and add to map
  function loadCitiesFromLocalStorage() {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.forEach(city => {
      city.fromLocalStorage = true;
      addCityToMap(city);
    });
  }

  // Load cities from localStorage
  loadCitiesFromLocalStorage();

  // Function to add city to the map as a marker
  function addCityToMap(city) {
    const point = {
      type: "point",
      longitude: city.coordinates[0],
      latitude: city.coordinates[1]
    };

    const markerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    };

    const attributes = {
      Name: city.name,
      Date: city.dateVisited,
      Impressions: city.impressions,
      Suggestions: city.suggestions
    };

    const popupTemplate = {
      title: "{Name}",
      content: `
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <strong>Date Visited:</strong> {Date}
            </div>
          </div>
          <div class="row">
            <div class="col">
              <strong>Impressions:</strong> {Impressions}
            </div>
          </div>
          <div class="row">
            <div class="col">
              <strong>Suggestions:</strong> {Suggestions}
            </div>
          </div>
        </div>
      `
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: attributes,
      popupTemplate: popupTemplate
    });

    // Add the graphic to the appropriate layer
    if (city.fromLocalStorage) {
      localStorageLayer.add(pointGraphic);
    } else {
      graphicsLayer.add(pointGraphic);
    }
  }

});
