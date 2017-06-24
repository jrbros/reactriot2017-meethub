import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import languages from '../../constants/languages';

const StyledSelectLanguage = styled.div`
    /* Box model */
    display: flex;
    height: 100%;
    width: 144px;
    align-items: center;
    padding: 0 1.125rem;
    position: relative;

    /* Typo */
    font-size: .875rem;
    color: ${props => props.theme.gray};

    /* Visual */
    border-left: 1px solid ${props => props.theme.grayLight};
`;

const Toggle = styled.div`
    width: 100%;
`;

const Options = styled.ul`
    /* Box model */
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 398px;
    right: 0;
    top: 10px;
    padding: 1rem 1rem .4375rem 1rem;

    /* Visual */
    border: 1px solid ${props => props.theme.grayLight};
    list-style-type: none;
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
`;

class SelectLanguage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: languages.map(language => ({
                name: language,
                active: false
            })),
            open: false
        }
    }

    handleToggle = event => {
        event.preventDefault();
        this.setState({ open: !this.state.open })
    }

    handleToggleLanguage = event => {
        event.preventDefault();
        this.setState({
            languages: this.state.languages.map(({name, active}) => ({
                name,
                active: name === event.target.value ? !active : active
            }))
        })
    }

    render() {
        const { languages } = this.state;
        const { theme: { gray }} = this.props;
        const activeLength = languages.filter(language => language.active).length;
        return (
            <StyledSelectLanguage>
                <Toggle onClick={this.handleToggle}>
                    { activeLength ? `${activeLength} languages` : 'Filter by language' }
                </Toggle>
                {
                    this.state.open ? (
                      <Options>
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
                    ) : null
                }
            </StyledSelectLanguage>
        );
    }
}


SelectLanguage.defaultProps = {

};

SelectLanguage.propTypes = {

};

export default withTheme(SelectLanguage);
