import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {

  
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });

  // const { email, password } = formData

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value})
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Success')
  // }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    this.props.login(this.state)
  }

  errors = () => {
    return (
      <div className="error-messages">
          {this.props.errors.map((error, index) => (
          <div key={index} className="font-white">
            {error.msg}
          </div>
        ))}
        </div>
    )
  }


  render() {
    if (this.props.authentication) {
      return <Redirect to="/home" />
    } 
    
    
    if (this.props.errors.length > 0) {
      return (
        <div className="ui two column centered grid login purple" style={{height: 'calc(100vh - 4vh)'}} >
          <div className="column login-form ">
          {this.errors()}
          <h1 className="font-white">Log In</h1>
          <form className="ui form">
            <div className="field">
              <label className="font-white">Email</label>
              <input type="email" name="email" placeholder="Email" onChange={this.handleInput}/>
            </div>
            <div className="field">
              <label className="font-white">Password</label>
              <input type="password" name="password" minLength='6' placeholder="Password" onChange={this.handleInput}/>
            </div>
            <button className="ui button inverted" type="submit" onClick={this.handleLogin}>Login</button>
          </form>
          <br />
          <p>
            Don't have an account? <Link to="/register" className="font-white"> Register</Link>
          </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="ui two column centered grid login purple" style={{height: 'calc(100vh - 4vh)'}} >
          <div className="column login-form ">
          <h1 className="font-white">Log In</h1>
          <form className="ui form">
            <div className="field">
              <label className="font-white">Email</label>
              <input type="email" name="email" placeholder="Email" onChange={this.handleInput}/>
            </div>
            <div className="field">
              <label className="font-white">Password</label>
              <input type="password" name="password" minLength='6' placeholder="Password" onChange={this.handleInput}/>
            </div>
            <button className="ui button inverted" type="submit" onClick={this.handleLogin}>Login</button>
          </form>
          <br />
          <p>
            Don't have an account? <Link to="/register" className="font-white"> Register</Link>
          </p>
          </div>
        </div>
      )
    }
  }
}

export default Login;