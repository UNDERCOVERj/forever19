import * as React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '@src/components/Home';

export default class App extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Redirect from='/' exact to='/lejunjie/add'/>
                    <Route path='/lejunjie' component={Home}/>
                </Switch>
            </Router>
        )
    }
}