import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SelectPlaces from 'react-select-places';
import { lighten } from 'polished';

import SelectLanguage from '../SelectLanguage';

const StyledFilters= styled.div`
    /* Box model */
    display: flex;
    margin: 0 auto;
    max-width: 680px;
    width: 100%;
    height: 48px;
    margin-top: -18px;

    /* Visual */
    border-radius: 3px;
    border-bottom: 1px solid #ddd;
`;

const Form = styled.form`
    /* Box model */
    display: flex;
`;

const Button = styled.button`
    /* Box model */
    padding: 0 1.2rem;

    /* Visual */
    color: #ffffff;
    background-color: #000000;
    text-transform: uppercase;
    border: 0;
    border-radius: 0 3px 3px 0;
    cursor: pointer;

    /* Typography */
    font-size: .8rem;
    font-weight: 600;

    &:focus {
        outline: none;
    }
`;

const StyledSelectPlaces = styled(SelectPlaces)`
    width: 432px;
    height: 100%;

    .Select-control {
        border: none;
        border-radius: 3px 0 0 3px;
        height: 100%;

        &:hover {
            box-shadow: none;
        }
    }

    .Select-placeholder {
        padding: .4rem .8rem;
    }

    .Select-noresults {
        font-size: 1rem;
    }

    .Select-value {
        padding: .4rem .8rem;
    }

    .Select-control {
        padding: .3rem .1rem;
    }

    .Select-placeholder, .Select--single > .Select-control .Select-value {
        color: ${props => props.theme.grayLight};
        font-size: .9375rem;
    }

    .Select-arrow-zone {
        display: none;
    }

    .Select-menu-outer {
        box-shadow: none;
        width: 680px;
        margin-top: 1px;
        margin-left: -1px;
        border-top: 0;
        border-right: 1px solid ${props => props.theme.grayLight};
        border-left: 1px solid ${props => props.theme.grayLight};
        border-bottom: 1px solid ${props => props.theme.grayLight};
    }

    .Select-option {
        color: ${props => props.theme.gray};
        font-size: .9375rem;
        padding: .4rem .8rem;
    }

    &.is-focused:not(.is-open) > .Select-control {
        border-color: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    &.is-searchable.is-open > .Select-control {
        border-bottom: 2px solid #000000;
    }

    .Select-option.is-focused {
        color: ${props => props.theme.gray};
        background-color: ${lighten(0.4, '#00c9ff')};
    }
`;

class Filters extends PureComponent {
    componentWillMount() {
        this.canBeSubmitted = true;
    }

    componentWillReceiveProps(nextProps) {
        this.canBeSubmitted = this._checkBeforeSubmit(nextProps);
    }

    _checkBeforeSubmit(nextProps) {
        const isNotEmpty = !(nextProps.geoLocation.empty && nextProps.languages.empty);
        const locationIsNew = (
            JSON.stringify(this.props.geoLocation.location) !==
            JSON.stringify(nextProps.geoLocation.location)
        );
        const languagesAreNew = (
            JSON.stringify(this.props.languages.selectedLanguages) !==
            JSON.stringify(nextProps.languages.selectedLanguages)
        );
        return isNotEmpty && (locationIsNew || languagesAreNew);
    }

    handleChangeLanguage = languages => {
        const activeLanguages = languages.filter(language => language.active).map(({name}) => name);
        this.props.updateLanguages(activeLanguages);
    }

    handleChangeLocation = location => {
        this.props.updateGeoLocation(location);
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.canBeSubmitted) {
            this.canBeSubmitted = false;
            return this.props.searchUsers({
                language: this.props.languages.selectedLanguages,
                location: this.props.geoLocation.empty ? [] : this.props.geoLocation.location[0]
            });
        }
    }

    render() {
        return (
            <StyledFilters>
                <Form onSubmit={this.handleSubmit}>
                    <StyledSelectPlaces
                      value={{placeId: this.props.geoLocation.placeId}}
                      onChange={this.handleChangeLocation}
                      clearable={false}
                      placeholder='Select city...'
                      autocompletionRequest={{
                          types: ['(cities)']
                        }}
                    />
                <SelectLanguage onChange={this.handleChangeLanguage} />
                <Button disabled={this.props.geoLocation.empty && this.props.languages.empty}>
                    Search
                </Button>
                </Form>
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
