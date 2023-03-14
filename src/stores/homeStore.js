import axios from 'axios'
import debounce from '../helpers/debounce'
import {create} from 'zustand'

const homeStore = create((set) => ({
  coins: [],
  trending: [],
  query: '',
  search: false,

  setQuery: (e) => {
    set({query: e.target.value})
    homeStore.getState().searchCoins()
  },

  searchCoins: debounce(async () => {
    const {query, trending} = homeStore.getState()

    if (query.length > 0) {    
      const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
      const coins = res.data.coins.map(coin => (
        { name: coin.name, image: coin.large,id: coin.id }
      ))
      set({coins, search: true})
    }

    else{
      set({coins: trending, search: false})
    }
    
  }, 500),

  fetchCoins: async () => {

    const [res, btcRes] = await Promise.all(
      [
        axios.get(`https://api.coingecko.com/api/v3/search/trending`),
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
      ]
    )

    const btcPrice = btcRes.data.bitcoin.usd

    const coins = res.data.coins.map(coin => (
      { 
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc.toFixed(15),
        priceUsd: (coin.item.price_btc * btcPrice).toFixed(15)
      }
    ))

    set({coins, trending: coins})
  }
}))

export default homeStore