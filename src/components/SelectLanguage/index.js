import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import pluralize from 'pluralize';

import LANGUAGES from '../../constants/languages';

const StyledSelectLanguage = styled.div`
    /* Box model */
    display: flex;
    height: 100%;
    width: 156px;
    justify-content: center;
    align-items: center;
    padding: 0 1.125rem;
    position: relative;

    /* Typo */
    font-size: .875rem;
    color: ${props => props.theme.gray};

    /* Visual */
    cursor: pointer;
    background-color: #ffffff;
    border-left: 1px solid ${props => props.theme.grayLight};
    transition: border .2s linear;
`;

const Toggle = styled.div`
    font-size: 1rem;
`;

const Options = styled.ul`
    /* Box model */
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 398px;
    right: 0;
    top: 33px;
    padding: 1rem 1rem .4375rem 1rem;

    /* Visual */
    background-color: #ffffff;
    border: 1px solid ${props => props.theme.grayLight};
    list-style-type: none;
    border-radius: 0 0 3px 3px;
    transition: all .15s linear;
`;

const Option = styled.li`
    /* Box model */
    position: relative;
    display: flex;
    height: 23px;
    align-items: center;
    padding: 0 .8125rem;
    margin-right: .625rem;
    margin-bottom: .5625rem;

    /* Visual */
    cursor: pointer;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 3px;
`

const Checkbox = styled.input`
    position: absolute;
    left: -9999px;
`;

const Label = styled.label`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
`;

class SelectLanguage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: LANGUAGES.map(language => ({
                name: language,
                active: false
            })),
            open: false
        }
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

   componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

   handleClickOutside(event) {
        const domNode = this.node; // eslint-disable-line react/no-find-dom-node
        if (this.state.open && (!domNode || !domNode.contains(event.target))) {
            this.props.disableSearch();
            this.setState({
                open: false
            });
        }
    }

    handleToggle = event => {
        event.preventDefault();
        this.setState({ open: !this.state.open })
    }

    handleToggleLanguage = event => {
        event.preventDefault();
        const updatedLanguages = this.state.languages && this.state.languages.map(({name, active}) => ({
            name,
            active: name === event.target.value ? !active : active
        }));
        this.setState({
            languages: updatedLanguages
        })
        this.props.onChange(updatedLanguages);
    }

    render() {
        const { languages, open } = this.state;
        const { theme: { gray }, activeSearch} = this.props;
        const activeLength = languages.filter(language => language.active).length;
        return (
            <div ref={node => (this.node = node)}>
                <StyledSelectLanguage
                    onClick={activeSearch}
                    style={{
                        borderBottom: open ? '2px solid #000' : '2px solid transparent'
                    }}
                >
                    <Toggle onClick={this.handleToggle}>
                        { activeLength ? `${activeLength} ${pluralize('language', activeLength)}` : 'Filter by language' }
                    </Toggle>
                    <Options
                      style={{
                        visibility: open ? 'visible' : 'hidden',
                        opacity: open ? '1' : '0'
                      }}
                    >
                        {
                            languages.map(({name, active}, index) => (
                                <Option key={index} style={{
                                  backgroundColor: active ? gray : 'transparent',
                                  color: active ? '#fff' : gray
                                }}>
                                    <Label htmlFor={name} />
                                    <Checkbox
                                      type='checkbox'
                                      id={name}
                                      value={name}
                                      checked={active}
                                      onChange={this.handleToggleLanguage}
                                    />
                                    {name}
                                </Option>
                            ))
                        }
                    </Options>
                </StyledSelectLanguage>
            </div>
        );
    }
}


SelectLanguage.defaultProps = {
    onChange: () => {}
};

SelectLanguage.propTypes = {
    onChange: PropTypes.func
};

export default withTheme(SelectLanguage);
