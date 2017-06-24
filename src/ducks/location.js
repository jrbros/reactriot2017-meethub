import googleAPI from '../apis/google';

const ACCEPT_GEO_LOCATION = 'ACCEPT_GEO_LOCATION';
const REFUSE_GEO_LOCATION = 'REFUSE_GEO_LOCATION';
const FAIL_GEO_LOCATION = 'FAIL_GEO_LOCATION';

function acceptGeoLocation(location) {
    return {
        type: ACCEPT_GEO_LOCATION,
        payload: {location}
    };
}

function refuseGeoLocation() {
    return {
        type: REFUSE_GEO_LOCATION
    };
}

function failGeoLocation() {
    return {
        type: FAIL_GEO_LOCATION,
        payload: {error: 'We failed to active geo location on your device.'}
    };
}

export function askForGeoLocation() {
    return dispatch => {
        try {
            return navigator.geolocation.getCurrentPosition(
                coordinates => {
                    googleAPI.getLocation(coordinates)
                             .then(location => dispatch(acceptGeoLocation(location)))
                },
                () => dispatch(failGeoLocation())
            )
        } catch (e) {
            return dispatch(refuseGeoLocation())
        }
    };
}


const INITIAL_STATE = {
    location: [],
    empty: true,
    error: null
};

const store = (state = INITIAL_STATE, action = null) => {
    switch (action.type) {
        case 'ACCEPT_GEO_LOCATION':
            const location = action.payload.location;
            return {
                error: null,
                location,
                empty: location.length <= 0,
            };
        case 'REFUSE_GEO_LOCATION':
            return {
                ...INITIAL_STATE,
            };
        case 'FAIL_GEO_LOCATION':
            return {
                ...INITIAL_STATE,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export default store;
