import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import SignUp from './pages/signup/SignUp';
import { AuthServiceType } from './services/auth_service';
import { DatabaseType } from './services/data_service';
import { useCookies } from 'react-cookie';

type PropType = {
  authService: AuthServiceType;
  databaseService: DatabaseType;
};

const App = ({ authService, databaseService }: PropType) => {
  const [cookies, setCookie, removeCookie] = useCookies(['login']);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Login
            authService={authService}
            cookies={cookies}
            setCookie={setCookie}
          />
        </Route>
        <Route path="/main" exact>
          <Main authService={authService} databaseService={databaseService} />
        </Route>
        <Route path="/signup" exact>
          <SignUp authService={authService} databaseService={databaseService} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
