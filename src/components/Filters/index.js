import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VirtualizedSelect from 'react-virtualized-select'
import SelectPlaces from 'react-select-places'

const StyledFilters= styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
`;

const options = [
    { label: 'Javascript', value: 'javascript' },
    { label: 'Python', value: 'python' },
];

class Filters extends PureComponent {

    handleChangeLanguage = value => {
        this.props.updateLanguages(value.map(v => v.value));
    }

    handleChangeLocation = value => {
        this.props.updateGeoLocation(value);
    }

    handleSubmit = event => {
        event.preventDefault();
        if (!(this.props.geoLocation.empty && this.props.languages.empty)) {
            console.log(this.props.languages.selectedLanguages);
            return this.props.searchUsers({
                language: this.props.languages.selectedLanguages,
                location: this.props.geoLocation.empty ? [] : this.props.geoLocation.location[0]
            });
        }
    }

    render() {
        return (
            <StyledFilters>
                <form onSubmit={this.handleSubmit}>
                    <SelectPlaces
                      value={{placeId: this.props.geoLocation.placeId}}
                      onChange={this.handleChangeLocation}
                      autocompletionRequest={{
                          types: ['(cities)']
                        }}
                    />
                    <VirtualizedSelect
                      options={options}
                      onChange={this.handleChangeLanguage}
                      value={this.props.languages.selectedLanguages}
                      multi
                    />
                <button disabled={this.props.geoLocation.empty && this.props.languages.empty}>
                        Search
                    </button>
                </form>
            </StyledFilters>
        );
    }
}


Filters.defaultProps = {
    updateLanguages: () => null,
    updateGeoLocation: () => null,
    geoLocation: {},
    languages: {}
};

Filters.propTypes = {
    updateLanguages: PropTypes.func,
    updateGeoLocation: PropTypes.func,
    geoLocation: PropTypes.object,
    languages: PropTypes.object
};

export default Filters;
