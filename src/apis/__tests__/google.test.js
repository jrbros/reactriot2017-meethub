import googleAPI, { parseLocation } from '../google';

it('can parse a location response coming from google', () => {
    const result = parseLocation(
        {address_components: [{long_name: 'test'}, {long_name: 'test2'}]}
    );
    expect(result).toEqual(expect.arrayContaining(['test', 'test2']));
});

it('can parse an uncomplete location response coming from google', () => {
    const result = parseLocation({});
    expect(result).toEqual(expect.arrayContaining([]));
});

it('can handle an error', () => {
    const result = googleAPI.handleErrorMessage({response: {status: 401}});
    expect(result).toBe('Ups! It\'s seems our google geolocation API token is now deprecated. Please contact us...');
});

it('can handle an unhandled error', () => {
    const result = googleAPI.handleErrorMessage({response: {status: 4864165456}});
    expect(result).toBe('We failed to active geolocation on your device.');
});

it('can handle an uncomplete error', () => {
    const result = googleAPI.handleErrorMessage({});
    expect(result).toBe('We failed to active geolocation on your device.');
});
