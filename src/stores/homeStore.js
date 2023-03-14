import axios from 'axios'
import debounce from '../helpers/debounce'
import {create} from 'zustand'

const homeStore = create((set) => ({
  coins: [],
  query: '',
  search: false,

  setQuery: (e) => {
    set({query: e.target.value})
    homeStore.getState().searchCoins()
  },

  searchCoins: debounce(async () => {
    const {query} = homeStore.getState()

    if (query.length > 2) {    
      const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
      const coins = res.data.coins.map(coin => (
        { name: coin.name, image: coin.large,id: coin.id }
      ))
      set({coins, search: true})
    }

    else{
      homeStore.getState().fetchCoins()
      set({search: false})
    }
    
  }, 500),

  fetchCoins: async () => {

    const [res, btcRes] = await Promise.all(
      [
        axios.get('https://api.coingecko.com/api/v3/search/trending'),
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
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

    console.log(coins)

    set({coins})
  }
}))

export default homeStore




























// import {create} from 'zustand'
// import axios from 'axios'
// import debounce from '../helpers/debounce'

// const homeStore = create((set) => ({
//   coins: [],
//   query: '',

//   setQuery: (e) => {
//     set({query: e.target.value})
//     homeStore.getState().searchCoins()
//   },

//   searchCoins: debounce(async () => {
//     const {query} = homeStore.getState()

//     if (query.length > 2) {    
//       const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
//       const coins = res.data.coins.map(coin => (
//         {
//           name: coin.name,
//           image: coin.large,
//           id: coin.id
//         }
//       ))

//       set({coins})
//     }

//     else{
//       homeStore.getState().fetchCoins()
//     }
    
//   }, 500),

//   fetchCoins: async () => {


//     const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
//     const coins = res.data.coins.map(coin => (
//       { 
//         name: coin.item.name,
//         image: coin.item.large,
//         id: coin.item.id,
//         priceBtc: coin.item.price_btc
//       }
//     ))

//     set({coins})
//   }
// }))

// export default homeStore