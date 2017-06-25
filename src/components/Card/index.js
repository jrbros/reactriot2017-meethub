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

const Card = ({avatarUrl, name, htmlUrl, login, location, languages}) => (
  <StyledCard>
      <img src={avatarUrl} alt={name} width='230' height='230' />
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
