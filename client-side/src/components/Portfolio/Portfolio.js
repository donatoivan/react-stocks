import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PortfolioDisplay from './PortfolioDisplay'

class Portfolio extends React.Component {

  state = {
    user: {},
    stocks: [],
    upToDateStockInfo: {},
    soldStocks: [],
    showing: false,
    selectedStock: {},
  }

  componentDidMount = async () => {
    try {
      console.log('mounting portfolio')
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/profile/me', {headers: { 'x-auth-token': token }})
      console.log(response.data)
      this.setState({
        user: response.data.user,
        stocks: response.data.stocks,
        soldStocks: response.data.soldStocks
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  stocks = () => {
    console.log('stocks in portfolio')
    return (
      <div className="portfolio-stocks ui two column centered grid">
        <div className="column portfolio-button-group">
          <h1 className="font-white portfolio-heading">My Portfolio</h1>
          {this.state.stocks.map((stock, index) => (
          <button className="ui button inverted port-button" key={index} onClick={() => this.handleShowClick(stock)} >
          
            {stock.symbol} {stock.name}
          
          </button>
        ))}
        </div>
      </div>
    )
  }

  findStockToShow = (stock) => {
    console.log(stock)
    try {
      const response = axios.get(`https://api.iextrading.com/1.0/stock/${stock.symbol}/book`)
      return response
    } catch (err) {
      console.log(err.message)
    } 
  }

  handleShowClick = async (stock) => {
    const response = await this.findStockToShow(stock)
    this.setState({showing: true, selectedStock: stock, upToDateStockInfo: response.data.quote})
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
          <div className="navbar-home" style={{height: 'calc(100vh - 4vh)'}}>
            {this.stocks()}
          </div>
        )
      } else {
        return(
          <div className="navbar-home" style={{height: 'calc(100vh - 4vh)'}}>
            <div className="ui container portfolio-display">
              <PortfolioDisplay stock={this.state.selectedStock} upToDate={this.state.upToDateStockInfo}/>
            </div>
            <button type="button" onClick={this.handleBack}>Back</button>
          </div>
        )
      }
     
    }
}

export default Portfolio;