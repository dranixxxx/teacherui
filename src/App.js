import GAListener from './components/GAListener';
import {
  //EmptyLayout, LayoutRoute,
  MainLayout } from './components/Layout';
import PageSpinner from './components/PageSpinner';
//import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import Cookie from "js-cookie";
import axios from "axios";
import AppContext from "./context/AppContext";

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const Teacher = React.lazy(() => import('./pages/TeacherPage'));
const Login = React.lazy(() => import('./pages/Login'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  state = {
        user: null,
    };

  componentDidMount() {
        const token = Cookie.get("token");

        if (token) {
            // authenticate the token on the server and place set user object
            axios.get("http://edunet.tranonline.ml/api/user/info", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(async (res) => {
                // if res comes back not valid, token is not valid
                // delete the token and log the user out on client

                if (!res.data.success) {
                    Cookie.remove("token");
                    this.setState({ user: null });
                    return null;
                }

                const user = await res.data.data;
                this.setUser(user);
                               // console.log(user)
            });
        }
  }
//check fix
    setUser = function(user){this.setState({ user: user });
    };
//     setUser = (user) => {
//         this.setState({ user });
//     };

  render() {
      console.log(this.state.user)
    return (
    <AppContext.Provider
                value={{
                    user: this.state.user,
                        isAuthenticated: !!this.state.user,
                        setUser: this.setUser,

                }}
            >
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/infor_user_course" component={Teacher} />
                <Route exact path="/login" component={Login}/>
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    </AppContext.Provider>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
