import React, { Component } from 'react';
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

class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: []
        }
    }

    handleChangeLanguage = value => {
        this.setState({
            language: value.map(({value}) => value)
        });
    }

    handleChangeLocation = value => {
        this.props.updateGeoLocation(value);
    }

    handleSubmit = event => {
        event.preventDefault();
        if (!(this.props.geoLocation.empty && this.state.language.length === 0)) {
            return this.props.searchUsers({
                language: this.state.language,
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
                      value={this.state.language}
                      multi
                    />
                    <button disabled={this.props.geoLocation.empty && this.state.language.length === 0}>
                        Search
                    </button>
                </form>
            </StyledFilters>
        );
    }
}


Filters.defaultProps = {

};

Filters.propTypes = {
    img: PropTypes.string,
    login: PropTypes.string,
    html_url: PropTypes.string,
};

export default Filters;
