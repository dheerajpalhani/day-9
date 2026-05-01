import { createContext, useContext, useReducer, useCallback } from 'react'
import userData from '../data/users.json'
import menuData from '../data/menu.json'
import restaurantData from '../data/restaurants.json'
import recommendationsData from '../data/recommendations.json'
import combosData from '../data/combos.json'

const AppContext = createContext()

const initialState = {
  user: userData,
  cart: [],
  favorites: userData.favorites || [],
  deliveryStatus: null,
  comboSuggestion: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.id === action.payload.id)
      const newCart = existing
        ? state.cart.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.cart, { ...action.payload, qty: 1 }]
      // Check for combo suggestion
      const combo = combosData.comboRules.find(r => r.triggerIds.includes(action.payload.id))
      return {
        ...state,
        cart: newCart,
        comboSuggestion: combo && !newCart.find(i => i.id === combo.suggest.id) ? combo : null,
      }
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload
      if (qty <= 0) return { ...state, cart: state.cart.filter(i => i.id !== id) }
      return { ...state, cart: state.cart.map(i => i.id === id ? { ...i, qty } : i) }
    }
    case 'CLEAR_CART':
      return { ...state, cart: [], comboSuggestion: null }
    case 'DISMISS_COMBO':
      return { ...state, comboSuggestion: null }
    case 'TOGGLE_FAVORITE': {
      const rid = action.payload
      const favs = state.favorites.includes(rid)
        ? state.favorites.filter(f => f !== rid)
        : [...state.favorites, rid]
      return { ...state, favorites: favs }
    }
    case 'START_DELIVERY':
      return { ...state, deliveryStatus: 'preparing', cart: [] }
    case 'UPDATE_DELIVERY':
      return { ...state, deliveryStatus: action.payload }
    case 'CLEAR_DELIVERY':
      return { ...state, deliveryStatus: null }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getRecommendations = useCallback((context = {}) => {
    const hour = new Date().getHours()
    let ids = []

    if (context.category && recommendationsData.categoryBased[context.category]) {
      ids = [...recommendationsData.categoryBased[context.category]]
    } else if (context.spicy) {
      ids = [...recommendationsData.spicyLovers]
    } else if (context.healthy) {
      ids = [...recommendationsData.healthPicks]
    } else if (hour >= 6 && hour < 11) {
      ids = [...recommendationsData.timeBased.breakfast]
    } else if (hour >= 11 && hour < 15) {
      ids = [...recommendationsData.timeBased.lunch]
    } else if (hour >= 15 && hour < 21) {
      ids = [...recommendationsData.timeBased.dinner]
    } else {
      ids = [...recommendationsData.timeBased.lateNight]
    }

    if (ids.length === 0) ids = recommendationsData.trending

    return ids.map(id => menuData.find(m => m.id === id)).filter(Boolean).slice(0, 6)
  }, [])

  const cartTotal = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = state.cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <AppContext.Provider value={{
      ...state,
      dispatch,
      menuData,
      restaurantData,
      getRecommendations,
      cartTotal,
      cartCount,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
