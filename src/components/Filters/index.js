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
            filter: {
                location: '',
                language: ''
            }
        }
    }

    handleChangeLanguages = value => {
        this.setState({
            filter: {
              ...this.state.filters,
              language: value.map(({value}) => value)
            }
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { filter } = this.state;
        this.props.searchUsers(filter);
    }

    render() {
        const { filter } = this.state;
        return (
            <StyledFilters>
                <form onSubmit={this.handleSubmit}>
                    <VirtualizedSelect
                      options={options}
                      onChange={this.handleChangeLanguages}
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
