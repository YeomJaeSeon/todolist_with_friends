import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import SignUp from './pages/signup/SignUp';
import { AuthServiceType } from './services/auth_service';
import { DatabaseType } from './services/data_service';

type PropType = {
  authService: AuthServiceType;
  databaseService: DatabaseType;
};

const App = ({ authService, databaseService }: PropType) => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Login authService={authService} />
      </Route>
      <Route path="/main" exact>
        <Main authService={authService} databaseService={databaseService} />
      </Route>
      <Route path="/signup" exact>
        <SignUp authService={authService} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
