import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
`;

const Card = ({avatar_url, login}) => (
  <StyledCard>
      <img src={avatar_url} alt={login} width='180' height='180' />
      <h2>{login}</h2>
  </StyledCard>
);

Card.defaultProps = {
    img: '',
    login: ''
};

Card.propTypes = {
    img: PropTypes.string,
    login: PropTypes.string
};

export default Card;
