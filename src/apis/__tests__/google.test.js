import googleAPI from '../google';

it('can parse a location response coming from google', () => {
    const result = googleAPI.parseLocation(
        {results: [{address_components: [{long_name: 'test'}, {long_name: 'test2'}]}]}
    );
    expect(result).toEqual(expect.arrayContaining(['test', 'test2']));
});

it('can parse an uncomplete location response coming from google', () => {
    const result = googleAPI.parseLocation({});
    expect(result).toEqual(expect.arrayContaining([]));
});
