import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VirtualizedSelect from 'react-virtualized-select'

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
            filters: {
                location: '',
                languages: ''
            }
        }
    }

    handleChangeLanguages = value => {
        this.setState({
            filters: {
              ...this.state.filters,
              languages: value
            }
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.filters);
    }

    render() {
        const { filters } = this.state;
        return (
            <StyledFilters>
                <form onSubmit={this.handleSubmit}>
                    <VirtualizedSelect
                      options={options}
                      onChange={this.handleChangeLanguages}
                      value={filters.languages}
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
