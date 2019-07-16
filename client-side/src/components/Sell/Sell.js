import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import SellStock from './SellStock';


class Sell extends React.Component {
  state = {
    user: {},
    stocks: [],
    selectedStock: {},
    selling: false,
    soldStock: {}
  }

  componentDidMount = async () => {
    console.log('mounting sell')
    const token = localStorage.getItem('token')
    const response = await axios.get('/api/profile/me', {headers: { 'x-auth-token': token }})
    console.log(response.data)
    this.setState({
      user: response.data.user,
      stocks: response.data.stocks,
    })
  }
  
  handleShowClick = async (stock) => {
    const response = await this.findStockToShow(stock)
    this.setState({selling: true, selectedStock: stock, upToDateStockInfo: response.data.quote})
    console.log(this.state)
  }

  findStockToShow = (stock) => {
    const response = axios.get(`https://api.iextrading.com/1.0/stock/${stock.symbol}/book`)
    return response
  }

  stocks = () => {
    return (
      <div className="portfolio-stocks">
          {this.state.stocks.map((stock, index) => (
          <div key={index} onClick={() => this.handleShowClick(stock)} >
            <ul>
              <li>{stock.symbol} {stock.name}</li>
            </ul>
          </div>
        ))}
        </div>
    )
  }

  sell = async (event) => {
    event.preventDefault();
    console.log(this.state.selectedStock)
    const token = localStorage.getItem('token')
    const id = this.state.selectedStock._id
    // const symbol = this.state.selectedStock.symbol
    const response = await axios.delete(`http://localhost:5000/api/profile/addstock/${id}`, {headers: { 'x-auth-token': token }})
    console.log(response);
    const stockToSell = {
      symbol: this.state.selectedStock.symbol,
      name: this.state.selectedStock.name,
      units: this.state.selectedStock.units,
      purchasePrice: this.state.selectedStock.purchasePrice,
      soldPrice: this.state.upToDateStockInfo.latestPrice
    }
    const soldResponse = await axios.put('http://localhost:5000/api/profile/soldstock', stockToSell, {headers: { 'x-auth-token': token }} )
    console.log(soldResponse)
    this.props.history.push('/history')
    // const response = await axios.delete(`http://localhost:5000/stocks/${symbol}`)
    // console.log(response);
    // this.props.AddToHistory(this.state.selectedStock)
    // this.setState({selling: false})
    // this.loadStocks();
  }

  handleBack = () => {
    this.setState({selling: false})
  }

  render() {
    console.log(this.props.history.location.pathname)
    const { authentication } = this.props
    if (!authentication) {
      return <Redirect to="/login" />
    }

    if (this.state.selling === false) {
      return(
          <div className="navbar-sell" style={{height: 'calc(100vh - 6vh)'}}>This is Sell
          {this.stocks()}
          </div>
      )
    } else {
      return(
        <div className="navbar-sell" style={{height: 'calc(100vh - 6vh)'}}>
          <SellStock stock={this.state.selectedStock} upToDate={this.state.upToDateStockInfo}/>
          <button type="button" onClick={this.handleBack}>Back</button>
          <button type="button" onClick={this.sell}>Sell</button>
        </div>
        )
      }
  }
}

export default withRouter(Sell);