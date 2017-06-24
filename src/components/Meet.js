import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import LoaderHOC from '../components/Loader';


const Wrapper = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
`;

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

const Button = LoaderHOC(styled.button`
`);

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
            <Wrapper>
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
                </List>
                {
                    !this.props.users.empty ?
                        <Button
                          onClick={this.handleIncrementPage}
                          loading={this.props.users.loadingIncrement}>
                          +
                        </Button> : null
                }
            </Wrapper>
        );
    }
}

Meet.defaultProps = {
    users: {},
};

Meet.propTypes = {
    users: PropTypes.object,
};

export default Meet;
