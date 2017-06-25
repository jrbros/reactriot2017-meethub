
const UPDATE_LANGUAGES = 'UPDATE_LANGUAGES';

function updateLanguages(languages) {
    return {
        type: UPDATE_LANGUAGES,
        payload: {languages}
    };
}

const INITIAL_STATE = {
    selectedLanguages: [],
    empty: true
};

const store = (state = INITIAL_STATE, action = null) => {
    switch (action.type) {
        case 'UPDATE_LANGUAGES':
            return {
                selectedLanguages: action.payload.languages,
                empty: action.payload.languages.length <= 0,
            };
        default:
            return state;
    }
}

export {
    updateLanguages
};
export default store;
