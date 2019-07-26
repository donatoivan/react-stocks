import React from 'react';
import Routes from './Routes';
import Navbar from './components/layout/Navbar';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = { authentication: false, errors: []}

  register = async (userCreds) => {
      
    try {
      const response = await axios.post('http://localhost:5000/api/users', userCreds)
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
    try {
      const response = await axios.post('http://localhost:5000/api/auth', userCreds)
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
      const authentication = await axios.get('http://localhost:5000/api/auth', {headers: { 'x-auth-token': token }})
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
        <div>
          <Navbar authentication={authentication} logout={logout} />
          <Routes authentication={authentication} logout={logout} errors={errors} register={register} login={login}/>
        </div>
    )
  }
};

export default App;
