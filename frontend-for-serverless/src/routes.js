import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './pages/Login';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/public" component={Chat} />
            </Switch>
        </Router>
    );
}

export default Routes;