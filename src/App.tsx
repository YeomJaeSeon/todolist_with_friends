import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import SignUp from './pages/signup/SignUp';
import { AuthServiceType } from './services/auth_service';

type PropType = {
  authService: AuthServiceType;
};

const App = ({ authService }: PropType) => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Login authService={authService} />
      </Route>
      <Route path="/main" exact>
        <Main authService={authService} />
      </Route>
      <Route path="/signup" exact>
        <SignUp authService={authService} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
