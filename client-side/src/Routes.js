import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Buy from './components/Buy/Buy';
import Sell from './components/Sell/Sell';
import Portfolio from './components/Portfolio/Portfolio';
import Home from './components/Home';
import History from './components/History/History';

class Routes extends React.Component {
  render() {
    const { authentication, errors, login, register } = this.props
    return (
      <Switch>
        <Route exact path="/portfolio" render={(history) => {
          return <Portfolio authentication={authentication} history={history} />
        }} />
        <Route exact path="/buy" render={(history) => {
          return <Buy authentication={authentication} history={history}/> 
        }} />
        <Route exact path="/sell" render={(history) => {
          return <Sell authentication={authentication} history={history} />
        }} />
        <Route exact path="/home" render={(history) => {
          return <Home authentication={authentication} history={history} />
        }} />
         <Route exact path="/history" render={(history) => {
          return <History authentication={authentication} history={history}/>
        }}/>
        <Route exact path="/register" render={(history) => {
          return <Register register={register} authentication={authentication} history={history} errors={errors}/>
        }} />
        <Route exact path="/" render={(history) => {
          return <Login login={login} authentication={authentication} history={history} errors={errors}/>
        }} />
      </Switch>
    )
  }
}

export default Routes;