import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Card from './Card';

const List = styled.ul`
    /* Box model */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
`;

const Item = styled.li`
    list-style-type: none;
    margin: 1rem .6rem;
`;

export class Meet extends PureComponent {

    render() {
        return (
            <List>
                {
                    this.props.users.map((user, index) => (
                        <Item key={index}>
                            <Card
                                {...user}
                                languages={user.languages.slice(0, 6)}
                                />
                        </Item>
                    ))
                }
            </List>
        );
    }
}

Meet.defaultProps = {
    users: [],
};

Meet.propTypes = {
    users: PropTypes.array,
};

export default Meet;
