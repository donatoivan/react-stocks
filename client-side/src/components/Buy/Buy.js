import React from 'react';
import axios from 'axios';
import SearchBar from '../Search/SearchBar';
import SearchDisplay from '../Search/SearchDisplay';
import ProspectiveStock from './ProspectiveStock';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';


class Buy extends React.Component {
  state = { 
    searchTerm: [], 
    buying: false,
    stockToBuy: {},
    currentPrice: {},
    units: 0
  }

  onSearchSubmit = async (term) => {
    const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=413500438a0bf0a780ab4c9d0454e870`) 
    this.setState({ searchTerm: response.data.bestMatches })
  }

  findStockToBuy = (stock) => {
    const response = axios.get(`https://api.iextrading.com/1.0/stock/${stock["1. symbol"]}/book`)
    return response
  }

  handleEditClick = async (stock) => {
    const response = await this.findStockToBuy(stock)
    this.setState({ buying: true, stockToBuy: response.data.quote, currentPrice: response.data.quote["latestPrice"] })
  }

  processPurchase = (event) => {
    event.preventDefault();

    const stock = {
      symbol: this.state.stockToBuy["symbol"],
      name: this.state.stockToBuy["companyName"],
      units: this.state.units,
      purchasePrice: this.state.currentPrice
    };
    const token = localStorage.getItem('token')

    axios.put('http://127.0.0.1:5000/api/profile/addstock', stock, {headers: { 'x-auth-token': token }})
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(this)
        this.props.history.push("/portfolio")
      })
      
  }

  cancelPurchase = () => {
    this.setState({buying: false, searchTerm: []})
  }




  render() {
    console.log(this.props.history.location.pathname)
    const { authentication } = this.props
    if (!authentication) {
      return <Redirect to="/login" />
    }


    if (this.state.buying === false) {
      return(
        <div className="navbar-buy" style={{height: 'calc(100vh - 6vh)'}}>
          <h2>This is the buying page</h2>
          <SearchBar onSubmit={this.onSearchSubmit}/>
          {this.state.searchTerm.length > 0 ? <h2>Results</h2> : ''}
          <SearchDisplay handleEditClick={this.handleEditClick} searchResults={this.state.searchTerm} />
        </div>
      )
    } else {
      return(
        <div className="navbar-buy" style={{height: 'calc(100vh - 6vh)'}}>
          <ProspectiveStock stock={this.state.stockToBuy} currentPrice={this.state.currentPrice} />
          <label>Quantity</label>
          <form>
            <input id="units" type="number" value={this.state.units} onChange={(e) => this.setState({units: e.target.value})}/>
            <button type="button" onClick={this.processPurchase}>Buy This Stock</button>
            <button type="button" onClick={this.cancelPurchase}>Go Back</button>
          </form>
        </div>
      )
    }
  }
}

export default withRouter(Buy);