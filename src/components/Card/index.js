import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LANGUAGES_COLORS from '../../constants/languagesColors';

const StyledCard = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
    max-width: 230px;
    overflow: hidden;

    /* Visual */
    background-color: #ffffff;
    border-radius: 3px;
`;

const Content = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .6rem;
`;

const Title = styled.h3`
    /* Box model */
    margin: .6rem 0 0;

    /* Typography */
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
    line-height: 1;
`;

const Link = styled.a`
    /* Visual */
    color: ${props => props.theme.gray};
    text-decoration: none;
`;

const Copy = styled.p`
    /* Box model */
    margin: 0 0 .8rem;

    /* Typography */
    font-size: 1rem;
    font-weight: 300;

    /* Visual */
    color: ${props => props.theme.gray};
`;

const List = styled.ul `
    /* Box model */
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 70px;
    overflow: hidden;

    /* Visual */
    list-style: none;
`;

const Item = styled.li`
    /* Box model */
    display: flex;
    align-items: center;
    margin-bottom: .6rem;
    padding: .2rem .8rem;

    /* Visual */
    color: #ffffff;
    background-color: ${props => props.theme.gray};
    border-radius: 3px;

    /* Typography */
    font-size: .8rem;
    font-weight: 600;

    &:not(:first-child) {
        margin-left: .4rem;
    }
`;

const WrapperImg = styled.div`
    position: relative;

    > a {
        visibility: hidden;
        opacity: 0;
    }

    &:hover > a {
        visibility: visible;
        opacity: 1;
    }
`;

const SayHello = styled.a`
    /* Box model */
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 6px;
    z-index: 1;

    /* Typo */
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    color: #fff;
    font-size: 1.5rem;

    &:before {
        /* Box model */
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;

        /* Visual */
        background-image: linear-gradient(263deg, #00c9ff, #92fe9d);
        transition: all .1s linear;
        opacity: .9;
    }
`;


const Card = ({avatarUrl, name, htmlUrl, login, location, languages}) => (
  <StyledCard>
      <WrapperImg>
          <img src={avatarUrl} alt={name} width='230' height='230' />
          <SayHello href='mailto:'>Say hello!</SayHello>
      </WrapperImg>
      <Content>
          <Title>
              <Link href={htmlUrl} target="_blank">{name}</Link>
          </Title>
          <Copy>{location}</Copy>
          <List>
            {
              languages.map((language, index) => (<Item
                  key={index}
                  style={{backgroundColor: LANGUAGES_COLORS[language] }}
                  >{language}</Item>))
            }
        </List>
    </Content>
  </StyledCard>
);

Card.defaultProps = {
    avatarUrl: '',
    name: '',
    login: '',
    htmlUrl: '',
    location: '',
    languages: []
};

Card.propTypes = {
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    login: PropTypes.string,
    htmlUrl: PropTypes.string,
    location: PropTypes.string,
    languages: PropTypes.array
};

export default Card;
