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

const Button = styled.button`
`;

export class Meet extends PureComponent {

    handleIncrementPage = event => {
        event.preventDefault();
        return this.props.searchUsers(
            this.props.users.searchParameters,
            this.props.users.page + 1
        );
    }

    render() {
        return (
            <List>
                {
                    this.props.users.usersInformations.map((user, index) => (
                        <Item key={index}>
                            <Card
                                {...user}
                                languages={user.languages.slice(0, 6)}
                                />
                        </Item>
                    ))
                }
                {
                    this.props.users.empty ? null : <Button onClick={this.handleIncrementPage}>+</Button>
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
