import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Menu from '../Pages/Menu';
import Login from '../Pages/Login';
import App from '../App';


function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/"  component={Login} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/recibos" component={App} />

        </Switch>

        </BrowserRouter>
    );
}

export default Routes;