import fetch from '../lib/fetch';
const API_KEY = 'AIzaSyDL-Fp8UhzndpG3iuXKITjZ1WeG_D-82qA';
const GEOLOC_API = 'https://maps.googleapis.com/maps/api/geocode/json';

export function parseLocation(location) {
    /**
     * Parse google geolication api response to only return the location as city, country....
     * @param {Object} location A complex response coming from google.
     * @returns {Array} The extracted content of the location.
     */
    try {
        return location[0].address_components.map(({long_name}) => long_name);
    } catch (e) {
        return [];
    }
}

export function getLocation(coordinates) {
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
    ).then(location => parseLocation(location.results));
}

export default {
    getLocation,
    parseLocation
}
