import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Card from './Card';

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled.li`
    list-style-type: none;
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
                                languages={
                                    user.languages.filter(lang => this.props.languages.includes(lang.toLowerCase()))
                                }
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
    languages: []
};

Meet.propTypes = {
    users: PropTypes.array,
    languages: PropTypes.array
};

export default Meet;
