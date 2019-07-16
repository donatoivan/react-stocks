import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import HistoryDisplay from './HistoryDisplay';

class History extends React.Component {
  state = {
    user: {},
    stocks: {},
    soldStocks: [],
    showing: false
  }

  componentDidMount = async () => {
    console.log('mounting history')
    const token = localStorage.getItem('token')
    const response = await axios.get('/api/profile/me', {headers: { 'x-auth-token': token }})
    console.log(response.data)
    this.setState({
      user: response.data.user,
      stocks: response.data.stocks,
      soldStocks: response.data.soldStocks,
      showing: false
    })
  }

  renderHistory = () => {
    console.log('stocks in history')
    console.log(this.state)
    return (
      <div className="history-stocks">
          {this.state.soldStocks.map((stock, index) => (
          <div key={index} onClick={() => this.handleShowClick(stock)} >
            <ul>
              <li>{stock.symbol} {stock.name}</li>
            </ul>
          </div>
        ))}
        </div>
    )
  }


  findStockToShow = (stock) => {
    console.log(stock)
    // const response = axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock["1. symbol"]}&apikey=413500438a0bf0a780ab4c9d0454e870`)
    const response = axios.get(`https://api.iextrading.com/1.0/stock/${stock.symbol}/book`)
    return response
  }

  handleShowClick = async (stock) => {
    const response = await this.findStockToShow(stock)
    console.log(stock)
    this.setState({showing: true, selectedStock: stock, upToDateStockInfo: response.data.quote})
  }

  findStockToShow = (stock) => {
    console.log(stock)
    // const response = axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock["1. symbol"]}&apikey=413500438a0bf0a780ab4c9d0454e870`)
    const response = axios.get(`https://api.iextrading.com/1.0/stock/${stock.symbol}/book`)
    return response
  }

  handleBack = () => {
    this.setState({showing: false})
  }


  render() {
    console.log(this.props.history.location.pathname)
    const { authentication } = this.props
    if (!authentication) {
      return <Redirect to="/login" />
    }

    if (this.state.showing === false) {
      return(
        <div className="navbar-history" style={{height: 'calc(100vh - 6vh)'}}>
          <h3>This is My History page</h3>
          {this.renderHistory()}
        </div>
      )
    } else {
      return(
        <div className="navbar-history" style={{height: 'calc(100vh - 6vh)'}}>
        <HistoryDisplay stock={this.state.selectedStock} upToDate={this.state.upToDateStockInfo}/>
        <button type="button" onClick={this.handleBack}>Back</button>
        </div>
      )
    }
  }
}

export default History;