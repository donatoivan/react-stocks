import React from 'react';

const ProspectiveStock = (props) => {
  
      return(

        <div>
          {props.stock["symbol"]}
          {props.stock["companyName"]}
          {props.stock["latest"]}
          {props.stock["latestTime"]}
          Other api

          {props.currentPrice}
        </div>
      )
    }

export default ProspectiveStock;