import React from 'react'
import homeStore from '../stores/homeStore'
import Header from '../components/Header'
import List from '../components/List'

export default function Home() {
  const store = homeStore()
  React.useEffect(() => {
    if(store.trending.length ===0) store.fetchCoins()
  }, [])

  return (
    <div>
      <Header />
      <header className = 'search'>
        <div className = 'width'>
          <h2>Search for a coin</h2>
          <input type = 'text' value = {store.query} onChange = {store.setQuery} />   
        </div>
      </header>
      <div className = 'coins'>
        <div className = 'width'>
          <h2>{store.search ? 'Search Results' : 'Trending Coins'}</h2>
          <div className = 'line'>
            {store.coins.map(coin => { return ( <List key = {coin.id} coin = {coin}/>)})}
          </div>
        </div>
      </div>
    </div>
  )
}