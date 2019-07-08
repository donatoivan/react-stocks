import React from 'react';

const SellStock = (props) => {
      return(
        <>
          <div>
            <h2>Sell This Stock</h2>
          </div>
          <h2>{props.stock.name}</h2>
          <div>
            <ul>
              <li>Symbol: {props.stock.symbol}</li>
              <li>Purchase Price: ${props.stock.purchasePrice}</li>
              <li>Latest Price: ${props.upToDate.latestPrice}</li>
              <li>Units: {props.stock.units}</li>
              <li>Market Value: ${(props.upToDate.latestPrice * props.stock.units).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</li>
              <li>Percentage Gain/Loss: {((((props.upToDate.latestPrice * props.stock.units) - (props.stock.purchasePrice * props.stock.units)) / (props.stock.purchasePrice * props.stock.units)) * 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%</li>
            </ul>
          </div>
          <h2>Updated Info</h2>
          <div>
            <ul>
              <li>Latest date: {props.upToDate.latestTime}</li>
              <li>Primary Exchange: {props.upToDate.primaryExchange}</li>
              <li>Sector: {props.upToDate.sector}</li>
              <li>Average Total Volume: {(props.upToDate.avgTotalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</li>
              <li>Market Cap: ${(props.upToDate.marketCap.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</li>
              <li>Previous Close: ${props.upToDate.previousClose}</li>
              <li>52 Week High: ${(props.upToDate.week52High).toFixed(2)}</li>
              <li>52 Week Low: ${(props.upToDate.week52Low).toFixed(2)}</li>
              <li>YTD Change: {(props.upToDate.ytdChange).toFixed(2)}%</li>
            </ul>
          </div>
        </>
      )
    }

export default SellStock;