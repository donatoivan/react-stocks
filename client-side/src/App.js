import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Buy from './components/Buy/Buy';
import Sell from './components/Sell/Sell';
import Portfolio from './components/Portfolio/Portfolio';
import Home from './components/Home';
import History from './components/History/History';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = { authentication: false, errors: []}

  register = async (userCreds) => {
      
    try {
      const response = await axios.post('/api/users', userCreds)
      console.log(response)
      const token = response.data.token
      localStorage.setItem('token', token)
      this.setState({
        authentication: true
      })
    } catch(error) {
      this.setState({
        authentication: false,
        errors: error.response.data.errors
      })
      console.log(error.response.data.errors)
    }
  }


  login = async (userCreds) => {
    console.log(userCreds)
    // console.log(this.state.error.message)
    // check the credentials
    try {
      const response = await axios.post('/api/auth', userCreds)
      console.log(response)
      const token = response.data.token
      localStorage.setItem('token', token)
      this.setState({
        authentication: true
      })
      console.log(this.state)
    } catch(error) {
      this.setState({
        authentication: false,
        errors: error.response.data.errors
      })
    }
  }

  async componentDidMount() {
    try {
      const token = localStorage.getItem('token')
      const authentication = await axios.get('/api/auth', {headers: { 'x-auth-token': token }})
      console.log(authentication)
      console.log('authenticated')
      
      this.setState({
        authentication: true,
        currentUser: authentication.data
      })
      console.log(this.state)
    } catch(err) {
      console.log(err)
    }
  }

  logout = () => {
    console.log('clicked')
    localStorage.removeItem('token')
    this.setState({
      authentication: false
    })
  }

  render() { 
    const { authentication, errors } = this.state
    const { register, login, logout } = this
    return(
      <BrowserRouter>
        <div className="ui container">
          <Navbar authentication={authentication} logout={logout} />
          <Route exact path="/" render={(history) => {
            return <Landing authentication={authentication} history={history} />
          }}/>
          {/* <section className="ui container"> */}
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
              {/* <section className="ui purple" style={{height: 'calc(100vh - 6vh)'}}> */}
                <Route exact path="/register" render={(history) => {
                  return <Register register={register} authentication={authentication} history={history} errors={errors}/>
                }} />
                <Route exact path="/login" render={(history) => {
                  return <Login login={login} authentication={authentication} history={history} errors={errors}/>
                }}
                />
              {/* </section> */}
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
};

export default App;
