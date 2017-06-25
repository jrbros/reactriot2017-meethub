import githubAPI, {
    buildSearchQuery, checkIfCurrentUrlContainsCodeParameter, extractCodeParameterFromCurrentUrl
} from '../github';

it('can build a query from a simple parameter object', () => {
    const result = buildSearchQuery({language: 'python', location: 'paris'});
    expect(result).toBe('language%3Apython+location%3Aparis&page=1');
});

it('can build a query from a parameter object with arrays', () => {
    const result = buildSearchQuery({language: ['python', 'scala'], location: 'paris'});
    expect(result).toBe('language%3Apython%2Blanguage%3Ascala+location%3Aparis&page=1');
});

it('can handle an error', () => {
    const result = githubAPI.handleErrorMessage({response: {status: 401}});
    expect(result).toBe('Ups! It\'s seems your github credentials are wrong...');
});

it('can handle an unhandled error', () => {
    const result = githubAPI.handleErrorMessage({response: {status: 4864165456}});
    expect(result).toBe('An unhandled error occured while calling github API...');
});

it('can handle an uncomplete error', () => {
    const result = githubAPI.handleErrorMessage({});
    expect(result).toBe('An unhandled error occured while calling github API...');
});

it('can check if the github code parameter is present in current location', () => {
    const result = checkIfCurrentUrlContainsCodeParameter({location: {href: 'http://nanana/?code=something#/'}});
    expect(result).toBe(true);
});

it('can check if the github code parameter is not present in current location', () => {
    const result = checkIfCurrentUrlContainsCodeParameter({location: {href: 'http://nanana/#/'}});
    expect(result).toBe(false);
});

it('can check if the github code parameter is not present in wrong window object', () => {
    const result = checkIfCurrentUrlContainsCodeParameter({});
    expect(result).toBe(false);
});

it('can extract github code parameter from current url', () => {
    const result = extractCodeParameterFromCurrentUrl({location: {href: 'http://nanana/?code=something#/'}});
    expect(result).toBe('something');
});
