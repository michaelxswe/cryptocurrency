import React from 'react'
import {Link} from 'react-router-dom'

export default function List({coin}) {
  return (
    <div className = 'coin'>
      <Link to = {`/${coin.id}`}>
        <span className = 'coin-image'>
          <img src = {coin.image} />
        </span>

        <span className = 'coin-name'>
          {coin.name}
        </span>

       {coin.priceBtc && <span className = 'coin-prices'>
          <span className = 'coin-btc'>
            <img src = '/bitcoin.webp' />
            {coin.priceBtc} (BTC)
          </span>

          <span className = 'coin-usd'>
            <img src = '/USD.webp' />
            {coin.priceUsd} (USD)
          </span>
        </span> }
      </Link>
    </div>
  )
}