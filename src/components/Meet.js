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
    /* Box model */
    height: 80px;

    /* Visual */
    outline: none;
    cursor: pointer;
    border: none;
    background-image: linear-gradient(263deg, #00c9ff, #92fe9d);

    > span {
        /* Box model */
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
`);

const Icon = styled.div`
    /* Box model */
    display: flex;
    justify-content: center;
    height: 3rem;
    width: 3rem;

    /* Typo */
    font-size: 2rem;

    /* Visual */
    border: 2px solid #fff;
    border-radius: 50%;
    color: #fff;

    > span {
        position: relative;
        top: 2px;
    }
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
        const { users: { usersInformations, loadingIncrement, empty },  } = this.props;
        return (
            <Wrapper>
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
                    !empty && usersInformations % 30 ?
                        <Button
                          onClick={this.handleIncrementPage}
                          loading={loadingIncrement}>
                              <span>
                                  <Icon><span>+</span></Icon>
                              </span>
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
