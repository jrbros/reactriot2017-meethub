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

    componentDidMount() {
        this.props.askForGeoLocation();
    }

    render() {
        const fakeFilter = {
            location: this.props.location.empty === true ? [] : this.props.location.location ,
            language: ['python']
        }
        if (this.props.users.error !== null) return <div>FAKE ERROR... {this.props.users.error}</div>
        if (this.props.users.loading === true) return <div>FAKE LOADER...</div>
        if (this.props.users.empty === true) {
            return (
                <div>
                    <div>FAKE WELCOME</div>
                    <div>{this.props.location.empty === true ? 'You refused geoloc' : this.props.location.location}</div>
                    <button onClick={() => this.props.searchUsers(fakeFilter)}>FAKE ACTION</button>
                </div>
            );
        }
        return (
            <div>
                FAKE LIST
                <List>
                    {
                        this.props.users.users.map(user => (
                            <Item key={user.id}>
                                <Card {...user} />
                            </Item>
                        ))
                    }
                </List>
            </div>
        );
    }
}

Meet.defaultProps = {
};

Meet.propTypes = {
};

export default Meet;
