
const ACTIVE_SEARCH = 'ACTIVE_SEARCH';
const DISABLE_SEARCH = 'DISABLE_SEARCH';

function activeSearch() {
    return {
        type: ACTIVE_SEARCH
    };
}

function disableSearch() {
    return {
        type: DISABLE_SEARCH
    };
}

const INITIAL_STATE = {
    searchIsActive: false
};

const store = (state = INITIAL_STATE, action = null) => {
    switch (action.type) {
        case 'ACTIVE_SEARCH':
            return {
                searchIsActive: true
            };
        case 'DISABLE_SEARCH':
            return {
                searchIsActive: false
              };
        default:
            return state;
    }
}

export {
    disableSearch,
    activeSearch
};
export default store;
