import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './redux/User/user.actions';

//Components
import AdminToolbar from './components/AdminToolbar';

//HOC
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

//Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';

//Pages
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from  './pages/Dashboard';
import Admin from './pages/Admin';
import './default.scss';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

    return (
      <div className="App">
        <AdminToolbar />
        <Switch>
            <Route exact path="/" render={
              () => (
                <HomepageLayout>
                  <Homepage />
                </HomepageLayout>
              )
            } />
            <Route exact path="/search" render={() => (
              <MainLayout>
                <Search />
              </MainLayout>  
            )} />
            <Route path="/search/:filterType" render={() => (
              <MainLayout>
                <Search />
              </MainLayout>  
            )} />
            <Route path="/registration" render={
              () => (
                <MainLayout>
                  <Registration />
                </MainLayout>
              )
              } />
              <Route path="/login" 
                render={() => (
                  <MainLayout>
                    <Login />
                  </MainLayout>
                )} />
                <Route path="/dashboard" 
                render={() => (
                  <WithAuth>
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </WithAuth>
                )} />
                <Route path="/admin" 
                render={() => (
                  <WithAdminAuth>
                      <AdminLayout>
                        <Admin />
                      </AdminLayout>
                  </WithAdminAuth>
                )} />
          </Switch>
      </div>
    );
  }

export default App;
