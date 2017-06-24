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
            filter: {
                language: []
            }
        }
    }

    handleChangeLanguage = value => {
        this.setState({
            filter: {
              ...this.state.filter,
              language: value.map(({value}) => value)
            }
        });
    }

    handleChangeLocation = value => {
        this.props.updateGeoLocation(value);
    }

    handleSubmit = event => {
        event.preventDefault();
        const { filter } = this.state;
        this.props.searchUsers({
            ...filter,
            location: this.props.geoLocation.empty ? [] : this.props.geoLocation.location[0]
        });
    }

    render() {
        const { filter } = this.state;
        console.log(this.props.geoLocation);
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
                      value={filter.language}
                      multi
                    />
                    <button>Search</button>
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
