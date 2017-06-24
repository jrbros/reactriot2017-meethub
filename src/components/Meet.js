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
        if (this.props.users.error !== null) return <div>FAKE ERROR... {this.props.users.error}</div>
        if (this.props.users.loading === true) return <div>FAKE LOADER...</div>

        return (
            <List>
                {
                    this.props.users.users.map(user => (
                        <Item key={`${user.id}-${user.login}`}>
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
