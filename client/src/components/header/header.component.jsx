import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/big-basket.svg';

import { logOut } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';

const Header  = ({ currentUser, logOut, history }) => {
    const signOut = event => {
        event.preventDefault();

        logOut();

        const timeFunction = () => {
            setTimeout(() => { 
                history.push('/signin')
            }, 750);
        }
        timeFunction();
    }

    return (    
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/'>
                    Home
                </Link>
                <Link className='option' to='/coding'>
                    Coding
                </Link>
                {
                    currentUser ? 
                        <Link className='option' to='/signin' onClick={signOut}>
                            Sign Out
                        </Link> 
                    : (
                        <div>
                            <Link className='option' to='/signin'>
                                Sign In
                            </Link>
                            <Link className='option hidden' to='/signup'>
                                Sign Up
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );   
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
}); 

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Header)
);