import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

//Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import './default.scss';
import { Component } from 'react';

class App extends Component {
  authListener = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          });
        })
      }

      setCurrentUser(userAuth);
    });
  }
  
  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <Switch>
            <Route exact path="/" render={
              () => (
                <HomepageLayout>
                  <Homepage />
                </HomepageLayout>
              )
            } />
            <Route path="/registration" render={
              () => currentUser ? <Redirect to="/" /> : (
                <MainLayout>
                  <Registration />
                </MainLayout>
              )
              } />
              <Route path="/login" 
                render={() => currentUser ? <Redirect to="/" /> : (
                  <MainLayout>
                    <Login />
                  </MainLayout>
                )} />
          </Switch>
      </div>
    );
  };
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
