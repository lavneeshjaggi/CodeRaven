import React, { lazy, Suspense } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Spinner from './components/spinner/spinner.component';

import { selectCurrentUser } from './redux/user/user.selectors';

import './App.scss';

const CodingPage = lazy(() => import('./pages/coding/coding.component'));
const Homepage = lazy(() => import('./pages/homepage/homepage.component'));
const SignInPage = lazy(() => import('./pages/sign-in/sign-in.component'));
const SignUpPage = lazy(() => import('./pages/sign-up/sign-up.component'));

const App = ({ currentUser }) => (
  <div>
    <Header />
    <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={Homepage} />
          <Route path='/coding' component={CodingPage} /> 
          <Route 
            exact 
            path='/signin' 
            render={() => 
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInPage />) 
            } 
          />
          <Route 
            exact 
            path='/signup' 
            render={() => 
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignUpPage />) 
            } 
          />
        </Suspense>
      </ErrorBoundary>
    </Switch>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(App);