// See https://leafletjs.com/examples/quick-start/
import * as Leaflet from 'leaflet';
import { statesData } from './us-states';

// General location/zoom to see all of Ontario
const ontario = {
  coords: new Leaflet.LatLng(51.2538, -85.3232),
  zoom: 5
};

// By default, zoom the map to this level
const defaultZoom = 14;

// Create a class to manage our map and popup
export class LeafletMap {
  map: Leaflet.Map;
  popup: Leaflet.Popup;
  geoJSONLayer: Leaflet.GeoJSON<any>;

  constructor(el: string | HTMLElement) {
    this.map = Leaflet.map(el);

    // Add the Open Street Maps tile layer (free)
    Leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(this.map);

    // adding a geoJSON layer so that we can add feature later.
    var states = JSON.parse(`[{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}]`);

Leaflet.geoJSON(statesData, {
    style: function(feature) {
        switch (feature.properties.name) {
            case 'California': return { color: "green" };
            case 'Idaho':   return { color: "green"};
            case 'Arizona':   return { color: "green"};
            case 'Texas':   return { color: "green"};
            case 'Ohio':   return { color: "green"};
            case 'Indiana':   return { color: "green"};
            default: return { color : "none"};
        }
    }
     
}).addTo(this.map);
    // Show an initial map of Ontario zoomed out
    this.map.setView(ontario.coords, ontario.zoom);
  }

  // update method, takes a location info, and updates the map and popup based on it
  update(lat: number, lng: number, name: string): void {
    // convert lat/lng to a Leaflet LatLng Object
    const coords = Leaflet.latLng(lat, lng);

    // Reposition the map to this location
    this.map.setView(coords, defaultZoom);

    // Update popup to the same position, with new name text
    if (this.popup) {
      // Update existing popup position and text
      this.popup.setLatLng(coords);
      this.popup.setContent(name);
    } else {
      // Create a popup if one doesn't exist
      this.popup = Leaflet
        .popup({
          // Don't let the user close this, we'll manage it
          closeButton: false,
          closeOnEscapeKey: false,
          closeOnClick: false
        })
        .setLatLng(coords)
        .setContent(name)
        .openOn(this.map);
    }
  }
}
