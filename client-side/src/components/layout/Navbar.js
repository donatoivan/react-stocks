import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const navbarColour = (pathname) => {
  switch(pathname) {
    case '/home':
      return 'navbar-home';
    case '/portfolio':
      return 'navbar-portfolio';
    case '/buy':
      return 'navbar-buy';
    case '/sell':
      return 'navbar-sell';
    case '/history':
      return 'navbar-history'
    default:
      return ''
  }
}
const Navbar = (props) => {
  console.log(props.history.location.pathname)
  if (props.authentication) {
    return(
      <div className={`ui secondary pointing menu ${navbarColour(props.history.location.pathname)} bd-zero`}>
      <Link to="/" className="item link">
        Home
      </Link>
      <Link to="/portfolio" className="item font-white">
        Portfolio
      </Link>
      <Link to="/buy" className="item font-white">
        Buy
      </Link>
      <Link to="/sell" className="item font-white">
        Sell
      </Link>
      <Link to="/history" className="item font-white">
        History
      </Link>
      <div className="right menu">
        <Link to="/" onClick={props.logout} className="ui item font-white">
          Logout
        </Link>
      </div>
    </div>
    )
  } else {
    return(
      <div className="ui secondary pointing menu nav">
        <Link to="/" className="item link">
          Home
        </Link>
        <Link to="/register" className="item link">
          Register
        </Link>
        {/* <Link to="/login" className="item">
          Login
        </Link>  */}
        {/* <Link to="/portfolio" className="item">
          Portfolio
        </Link>
        <Link to="/buy" className="item">
          Buy
        </Link>
        <Link to="/sell" className="item">
          Sell
        </Link>  */}
        <div className="right menu header">
          <Link to="/login" onClick={props.logout} className="ui item link">
            Login
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Navbar);