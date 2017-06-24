import githubAPI from '../github';

it('can build a query from a simple parameter object', () => {
    const result = githubAPI.buildSearchQuery({language: 'python', location: 'paris'});
    expect(result).toBe('language:python+location:paris');
});

it('can build a query from a parameter object with arrays', () => {
    const result = githubAPI.buildSearchQuery({language: ['python', 'scala'], location: 'paris'});
    expect(result).toBe('language:python+language:scala+location:paris');
});
