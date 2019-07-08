import React from 'react';

const SearchDisplay = (props) => {
  const results = props.searchResults.map((stock) => {
    // console.log(stock["1. symbol"])
    return <div onClick={() => props.handleEditClick(stock)} key={stock["1. symbol"]}>{stock["2. name"]} ({stock["1. symbol"]})</div>
  })
      return(

        <div>
          {results}
        </div>
      )
    }

export default SearchDisplay;