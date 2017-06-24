import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
`;

const Card = ({avatar_url, login, html_url}) => (
  <StyledCard>
      <img src={avatar_url} alt={login} width='180' height='180' />
      <h2>
          <a href={html_url}>{login}</a>
      </h2>
  </StyledCard>
);

Card.defaultProps = {
    img: '',
    login: '',
    html_url: ''
};

Card.propTypes = {
    img: PropTypes.string,
    login: PropTypes.string,
    html_url: PropTypes.string,
};

export default Card;
