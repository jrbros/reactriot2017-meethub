import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import pluralize from 'pluralize';

import LANGUAGES from '../../constants/languages';

const StyledSelectLanguage = styled.div`
    /* Box model */
    height: 100%;
    width: 156px;
    padding: 0 .2rem;
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
    /* Box model */
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    /* Typo */
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
    cursor: pointer;
`;

class SelectLanguage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeLanguages: {},
            open: false
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeLanguages: Object.assign({}, ...nextProps.languages.map(language => ({[language]: true})))
        });
    }

    handleClickOutside = event => {
        const domNode = this.node; // eslint-disable-line react/no-find-dom-node
        if (this.state.open && (!domNode || !domNode.contains(event.target))) {
            this.setState({open: false});
        }
    }

    handleToggle = event => {
        event.preventDefault();
        this.setState(({open}) => ({open: !open}));
    }

    handleToggleLanguage = event => {
        event.preventDefault();
        const languageToUpdate = event.target.value;
        const newActiveLanguages = {
            ...this.state.activeLanguages,
            [languageToUpdate]: !this.state.activeLanguages[languageToUpdate]
        };
        const updatedLanguages = Object.entries(newActiveLanguages)
            .filter(([_, active]) => active)
            .map(([language, _]) => language);
        this.props.onChange(updatedLanguages);
    }

    render() {
        const { activeLanguages, open } = this.state;
        const { languages, theme: { gray } } = this.props;
        const activeLength = languages.filter(language => activeLanguages[language]).length;
        return (
            <div ref={node => (this.node = node)}>
                <StyledSelectLanguage
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
                            LANGUAGES.map((language, index) => (
                                <Option key={index} style={{
                                  backgroundColor: activeLanguages[language] ? gray : 'transparent',
                                  color: activeLanguages[language] ? '#fff' : gray
                                }}>
                                    <Label htmlFor={language} />
                                    <Checkbox
                                      type='checkbox'
                                      id={language}
                                      value={language}
                                      checked={activeLanguages[language]}
                                      onChange={this.handleToggleLanguage}
                                    />
                                {language}
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
