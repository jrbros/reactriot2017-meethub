import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';

import SelectPlace from './SelectPlace';
import SelectLanguage from './SelectLanguage';

const StyledFilters= styled.div`
    /* Box model */
    display: flex;
    margin: 0 auto;
    max-width: 680px;
    width: 100%;
    height: 48px;
    margin-top: -18px;
    z-index: 6;
    position: relative;

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

    &:disabled {
        background-color: ${lighten(0.3, '#000')};
        color: ${lighten(0.7, '#fff')};
    }
`;


class Filters extends PureComponent {
    componentWillMount() {
        this.canBeSubmitted = true;
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutsideFilters, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutsideFilters, false);
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
        return isNotEmpty && (this.canBeSubmitted || locationIsNew || languagesAreNew);
    }

    handleChangeLanguage = languages => {
        this.props.updateLanguages(languages);
    }

    handleChangeLocation = location => {
        console.log(location);
        this.props.updateGeoLocation(location);
    }

    handleClickOutsideFilters = event => {
        const domNode = this.node; // eslint-disable-line react/no-find-dom-node
        if ((!domNode || !domNode.contains(event.target)) && event.target.id !== 'SearchButton') {
            this.props.disableSearch();
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.disableSearch();
        if (this.props.pathname !== '/meet') {
            this.props.push('meet');
        }
        if (this.canBeSubmitted) {
            this.canBeSubmitted = false;
            return this.props.searchUsers({
                language: this.props.languages.selectedLanguages,
                location: this.props.geoLocation.empty ? [] : this.props.geoLocation.location[0]
            });
        }
    }

    render() {
        const { geoLocation, languages, activeSearch, disableSearch } = this.props;
        return (
            <StyledFilters>
                <Form onSubmit={this.handleSubmit}>
                    <div
                        style={{ display: 'flex'}}
                        onClick={activeSearch}
                        ref={node => (this.node = node)}
                    >
                        <SelectPlace
                            value={geoLocation.placeId ? {placeId: geoLocation.placeId} : geoLocation.location[0]}
                            onChange={this.handleChangeLocation}
                        />
                        <SelectLanguage
                            languages={languages.selectedLanguages}
                            onChange={this.handleChangeLanguage}
                            disableSearch={disableSearch}
                        />
                    </div>
                    <Button id='SearchButton' disabled={geoLocation.empty && languages.empty}>
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
