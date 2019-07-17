import React from 'react';

class Home extends React.Component {
  render () {
    console.log(this.props.history.location.pathname)
    return(
      <div className="navbar-home main" style={{height: 'calc(100vh - 6vh)'}}>
        <div>Home</div>
      </div>
    )
  }
}

export default Home;