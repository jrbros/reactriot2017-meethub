import githubAPI, { buildSearchQuery } from '../github';

it('can build a query from a simple parameter object', () => {
    const result = buildSearchQuery({language: 'python', location: 'paris'});
    expect(result).toBe('language:python+location:paris&page=1');
});

it('can build a query from a parameter object with arrays', () => {
    const result = buildSearchQuery({language: ['python', 'scala'], location: 'paris'});
    expect(result).toBe('language:python+language:scala+location:paris&page=1');
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
