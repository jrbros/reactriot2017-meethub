import googleAPI from '../google';

it('can parse a location response coming from google', () => {
    const result = googleAPI.parseLocation(
        {address_components: [{long_name: 'test'}, {long_name: 'test2'}]}
    );
    expect(result).toEqual(expect.arrayContaining(['test', 'test2']));
});

it('can parse an uncomplete location response coming from google', () => {
    const result = googleAPI.parseLocation({});
    expect(result).toEqual(expect.arrayContaining([]));
});

it('can handle an error', () => {
    const result = googleAPI.handleErrorMessage({response: {status: 401}});
    expect(result).toBe('Ups! It\'s seems our google geolocation API token is now deprecated. Please contact us...');
});

it('can handle an unhandled error', () => {
    const result = googleAPI.handleErrorMessage({response: {status: 4864165456}});
    expect(result).toBe('An unhandled error occured while calling google geolocation API...');
});

it('can handle an uncomplete error', () => {
    const result = googleAPI.handleErrorMessage({});
    expect(result).toBe('An unhandled error occured while calling google geolocation API...');
});
