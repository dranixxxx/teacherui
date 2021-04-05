import React from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import PageSpinner from "./components/PageSpinner";
import componentQueries from 'react-component-queries';
import './styles/reduction.scss';
import { Provider } from './context/Context';
import GAListener from './components/GAListener';
import {
  //EmptyLayout, LayoutRoute,
  MainLayout } from './components/Layout';

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const Login = React.lazy(() => import('./pages/Login'));
const Teacher = React.lazy(() => import('./pages/TeacherPage'));
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
          <Provider>
            <BrowserRouter basename={getBasename()}>
              <GAListener>
                <Switch>
                  <MainLayout breakpoint={this.props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                  <Route exact path="/" component={DashboardPage} />
                  <Route exact path="/infor_user_course" component={Teacher} />
                  {/*<Route exact path="/accounts" component={Accounts}/>*/}
                  {/*<Route exact path="/reports" component={Reports}/>*/}
                  <Route exact path="/login" component={Login}/>
                  </React.Suspense>
                  </MainLayout>
                </Switch>
              </GAListener>
            </BrowserRouter>
          </Provider>
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
