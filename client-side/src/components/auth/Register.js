import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Register extends React.Component {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   password2: ''
  // });

  // const { name, email, password, password2 } = formData

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value})
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (password !== password2) {
  //     console.log('passwords do not match')
  //   } else {
  //     console.log('Success')
  //   }
  // }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister = (e) => {
    e.preventDefault()
    this.props.register(this.state)
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
        <div className="ui two column centered grid purple register" style={{height: 'calc(100vh - 4vh)'}}>
          <div className="column login-form">
            {this.errors()}
            <h1 className="font-white">Sign Up</h1>
            <form className="ui form">
              <div className="field">
                <label className="font-white">Name</label>
                <input type="text" name="name" placeholder="Name" onChange={this.handleInput}/>
              </div>
              <div className="field">
                <label className="font-white">Email</label>
                <input type="email" name="email" placeholder="Email" onChange={this.handleInput}/>
              </div>
              <div className="field">
                <label className="font-white">Password</label>
                <input type="password" name="password" minLength='6' placeholder="Password" onChange={this.handleInput}/>
              </div>
              {/* <div className="field">
                <label className="font-white">Confirm Password</label>
                <input type="password" name="password2" minLength='6' placeholder="Confirm Password" onChange={this.handleInput}/>
              </div> */}
              <button className="ui inverted button" onClick={this.handleRegister} >Submit</button>
              <p>
                Already have an account? <Link to="/login" className="font-white"> Login</Link>
              </p>
            </form>
          </div>
        </div>
      )
    } else {
      return (
        <div className="ui two column centered grid purple register" style={{height: 'calc(100vh - 4vh)'}}>
          <div className="column login-form">
            <h1 className="font-white">Sign Up</h1>
            <form className="ui form">
              <div className="field">
                <label className="font-white">Name</label>
                <input type="text" name="name" placeholder="Name" onChange={this.handleInput}/>
              </div>
              <div className="field">
                <label className="font-white">Email</label>
                <input type="email" name="email" placeholder="Email" onChange={this.handleInput}/>
              </div>
              <div className="field">
                <label className="font-white">Password</label>
                <input type="password" name="password" minLength='6' placeholder="Password" onChange={this.handleInput}/>
              </div>
              {/* <div className="field">
                <label className="font-white">Confirm Password</label>
                <input type="password" name="password2" minLength='6' placeholder="Confirm Password" onChange={this.handleInput}/>
              </div> */}
              <button className="ui inverted button" onClick={this.handleRegister} >Submit</button>
              <p>
                Already have an account? <Link to="/login" className="font-white"> Login</Link>
              </p>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default Register;