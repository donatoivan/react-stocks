import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Landing = (props) => {
  if (props.authentication) {
    return(
      <Redirect to="/home" />
    )
  } else {
    return (
      <div className="ui middle aligned center aligned grid landing" style={{height: 'calc(100vh - 4vh)'}}>
        <div className="column">
          <h1 className="ui header main-header font-white">Virtual Portfolio</h1>
          <h3 className="ui header font-white">A digital stock market playground</h3>
          <br/>
          <div>
            <Link to="/register" className="ui inverted button">Sign up</Link>
            <Link to="/login" className="ui inverted button">Login</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;