import React from 'react';

class SearchBar extends React.Component {
  state =  {term: '' }

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.term)
  }

  render() {
    return(
      <div className="ui container">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Stock Search</label>
            <input id="searchbar" type="text" value={this.state.term} onChange={(e) => this.setState({term: e.target.value})}/>
          </div>

        </form>

      </div>
    )
  }
}

export default SearchBar;