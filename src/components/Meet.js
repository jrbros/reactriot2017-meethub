import React from 'react';
// import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Card from './Card';

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled.li`
    list-style-type: none;
`;

export class Meet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    render() {
        return (
            <List>
                {
                    this.props.users.usersInformations.map((user, index) => (
                        <Item key={index}>
                            <Card {...user} />
                        </Item>
                    ))
                }
            </List>
        );
    }
}

Meet.defaultProps = {
};

Meet.propTypes = {
};

export default Meet;
