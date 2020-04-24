import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import MainUsuario from './pages/usuarios/main';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = "/usuarios" component = {MainUsuario}></Route>
        </Switch>
    </BrowserRouter>
)

export default Routes;