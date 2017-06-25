import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SelectPlaces from 'react-select-places';
import { lighten } from 'polished';


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


class SelectPlace extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.value === this.props.value) return false;
        if (nextProps.value && this.props.value && nextProps.value.placeId === this.props.value.placeId) return false;
        return true;
    }

    render() {
        const { value, onChange } = this.props;
        return (
            <StyledSelectPlaces
              value={value}
              onChange={onChange}
              clearable={false}
              placeholder='Select city...'
              autocompletionRequest={{
                  types: ['(cities)']
                }}
            />
        );
    }
}

SelectPlace.defaultProps = {
};

SelectPlace.propTypes = {
};

export default SelectPlace;
