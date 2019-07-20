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
      <div className="error-messages register-errors">
          {this.props.errors.map((error, index) => (
          <div key={index} className="font-purple">
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
        <div className="login-page-main" style={{height: '100vh'}} >
          <div className="left">
            <div className="column login-form ">
              {this.errors()}
              <h1 className="font-purple login-header">Log In</h1>
              <form className="ui form">
                <div className="field">
                  <label className="font-purple">Email</label>
                  <input className="useFontAwesomeFamily" type="email" name="email" placeholder="&#xF0c0; Email" onChange={this.handleInput}/>
                </div>
                <div className="field">
                  <label className="font-purple">Password</label>
                  <input className="useFontAwesomeFamily" type="password" name="password" minLength='6' placeholder="&#xF023; Password" onChange={this.handleInput}/>
                </div>
                <button className="ui button button-green" type="submit" onClick={this.handleLogin}>Login</button>
              </form>
              <br />
              <p className="font-purple">
                Don't have an account? <Link to="/register" className="font-green"> Register</Link>
              </p>
            </div>
          </div>
          <div className="right">
            <h4 className="ui header font-white welcome">Welcome to</h4>
            <i class="font-white fas fa-cubes fa-2x"></i>
            <h1 className="ui header font-white">Virtual Portfolio</h1>
            <h4 className="ui header font-white">A digital stock market playground</h4>
          </div>
        </div>
      )
    } else {
      return (
        <div className="login-page-main" style={{height: '100vh'}} >
          <div className="left">
            <div className="column login-form ">
              <h1 className="font-purple login-header">Log In</h1>
              <form className="ui form">
                <div className="field">
                  <label className="font-purple">Email</label>
                  <input className="useFontAwesomeFamily" type="email" name="email" placeholder="&#xF0c0; Email" onChange={this.handleInput}/>
                </div>
                <div className="field">
                  <label className="font-purple">Password</label>
                  <input className="useFontAwesomeFamily" type="password" name="password" minLength='6' placeholder="&#xF023; Password" onChange={this.handleInput}/>
                </div>
                <button className="ui button button-green" type="submit" onClick={this.handleLogin}>Login</button>
              </form>
              <br />
              <p className="font-purple">
                Don't have an account? <Link to="/register" className="font-green"> Register</Link>
              </p>
            </div>
          </div>
          <div className="right">
            <h4 className="ui header font-white welcome">Welcome to</h4>
            <i className="font-white fas fa-cubes fa-2x"></i>
            <h1 className="ui header font-white">Virtual Portfolio</h1>
            <h4 className="ui header font-white">A digital stock market playground</h4>
          </div>
        </div>
      )
    }
  }
}

export default Login;