import fetch from '../lib/fetch';
const API_KEY = 'AIzaSyDL-Fp8UhzndpG3iuXKITjZ1WeG_D-82qA';
const GEOLOC_API = 'https://maps.googleapis.com/maps/api/geocode/json';

function getLocation(coordinates) {
    /**
     * Call the google geolocation search api by passing a coordinates object.
     * @param {Coordinates} coordinates A Coordinate object givent by js geoloc.
     * @returns {Promise} The promise giving the location search results.
     */
    const {latitude, longitude} = coordinates.coords ? coordinates.coords : {};
    return fetch(
        `${GEOLOC_API}?result_type=locality&latlng=${latitude},${longitude}&key=${API_KEY}`,
        {
            method: 'GET'
        }
    ).then(locations => (
        locations.results && locations.results.length > 0 ?
            locations.results[0].address_components.map(({long_name}) => long_name) :
            []
    ));
}

export default {
    getLocation,
}
