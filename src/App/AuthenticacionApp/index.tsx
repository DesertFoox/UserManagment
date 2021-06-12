import React, { Fragment } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

  import Login from '../../Screens/Authorize/Login'

export interface AuthAppProps {
}
 
const AuthApp: React.SFC<AuthAppProps> = () => {
    return ( 
        <Fragment>
            <Router>
                <Switch>
                    <Route exact component={Login} path="/"></Route>
                </Switch>
            </Router>
        </Fragment>
     );
}
 
export default AuthApp;