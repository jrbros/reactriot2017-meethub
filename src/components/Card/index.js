import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
`;

const Card = ({avatar_url, name, html_url, location, languages}) => (
  <StyledCard>
      <img src={avatar_url} alt={name} width='180' height='180' />
      <h2>
          <a href={html_url}>{name}</a>
      </h2>
      <p>{location}</p>
      <ul>
        {
          languages.map((language, index) => (<li key={index}>{language}</li>))
        }
      </ul>
  </StyledCard>
);

Card.defaultProps = {
    img: '',
    name: '',
    html_url: '',
    location: '',
    languages: []
};

Card.propTypes = {
    img: PropTypes.string,
    name: PropTypes.string,
    html_url: PropTypes.string,
    location: PropTypes.string,
    languages: PropTypes.array
};

export default Card;
