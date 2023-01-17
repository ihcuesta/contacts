
import { createStore, createLogger } from 'vuex';
import product from './modules/Product';

const debug = process.env.NODE_ENV !== 'production'

const Store = createStore({
  modules: {
    product
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default Store;