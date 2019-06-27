import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Room from './components/Room'
import App from './App'
import Home from './Home'

import {
    Route,
    Switch,
    HashRouter
} from 'react-router-dom'

const Root = () => (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Room}/>
            <Route exact path='/Room/:Room/' component={Home}/>
            <Route exact path='/Room/:Room/:Game' component={(props) => <App {...props} isGame={true}/>}/>
        </Switch>
    </HashRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
