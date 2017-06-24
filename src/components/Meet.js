import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import LoaderHOC from '../components/Loader';


const Wrapper = styled.div`
    /* Box model */
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;

    &:before {
        /* Box model */
        content: '';
        top: -30px;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        z-index: 0;

        /* Visual */
        visibility: ${props => props.searchIsActive ? 'visible' : 'hidden'};
        opacity: ${props => props.searchIsActive ? '1' : '0'};
        background-color: rgba(0, 0, 0, .6);
        transition:  all .2s linear;
    }
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
        const { users: { usersInformations, loadingIncrement, empty}, searchIsActive } = this.props;
        return (
            <Wrapper searchIsActive={searchIsActive}>
                <List>
                    {
                        usersInformations.map((user, index) => (
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
                    !empty ?
                        <Button
                          onClick={this.handleIncrementPage}
                          loading={loadingIncrement}>
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
