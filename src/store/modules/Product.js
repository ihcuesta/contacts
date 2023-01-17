// import { GET_ALL_PRODUCTS } from "./Types";
import axios from 'axios';

// initial state
const state = () => ({
  contacts: [],
  productsPaginatedData: null,
  product: null,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null
})

// getters
const getters = {
  contactList: state => state.contacts,
  productsPaginatedData: state => state.productsPaginatedData,
  product: state => state.product,
  isLoading: state => state.isLoading,
  isCreating: state => state.isCreating,
  isUpdating: state => state.isUpdating,
  createdData: state => state.createdData,
  updatedData: state => state.updatedData,

  isDeleting: state => state.isDeleting,
  deletedData: state => state.deletedData
};

// actions
const actions = {
  async fetchAllContacts({ commit }) {
    commit('setProductIsLoading', true);
    let url = `${process.env.VUE_APP_API_URL}contacts`;

    await axios.get(url)
      .then(res => {
        const contacts = res.data;
        commit('setContacts', contacts);
        commit('setProductIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setProductIsLoading', false);
      });
  },

  fetchDetailProduct({ commit }, item) {
    commit('setProductDetail', item);
  },

  async storeProduct({ commit }, product) {
    commit('setProductIsCreating', true);
    await axios.post(`${process.env.VUE_APP_API_URL}contacts`, product)
      .then(res => {
        commit('saveNewProducts', res.data);
        commit('setProductIsCreating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setProductIsCreating', false);
      });
  },

  async updateProduct({ commit, dispatch }, product) {
    commit('setProductIsUpdating', true);
    commit('setProductIsUpdating', true);
    await axios.put(`${process.env.VUE_APP_API_URL}contacts/${product.id}`, product)
      .then(res => {
        commit('saveUpdatedProduct', res.data)
        commit('setProductIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setProductIsUpdating', false);
      });
      dispatch('fetchAllContacts')
  },


  async deleteProduct({ commit, dispatch }, id) {
    commit('setProductIsDeleting', true);
    await axios.delete(`${process.env.VUE_APP_API_URL}contacts/${id}`)
      .then(res => {
        commit('setDeleteProduct', res.data.id);
        commit('setProductIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
        commit('setProductIsDeleting', false);
      });
      dispatch('fetchAllContacts')
  },

  updateProductInput({ commit }, e) {
    commit('setProductDetailInput', e);
  }
}

// mutations
const mutations = {
  setContacts: (state, contacts) => {
    state.contacts = contacts
  },

  setProductsPaginated: (state, productsPaginatedData) => {
    state.productsPaginatedData = productsPaginatedData
  },

  setProductDetail: (state, product) => {
    state.product = product
  },

  setDeleteProduct: (state, id) => {
    state.contacts.filter(x => x.id !== id);
  },

  setProductDetailInput: (state, e) => {
    let product = state.product;
    product[e.target.name] = e.target.value;
    state.product = product
  },

  saveNewProducts: (state, product) => {
    state.products.unshift(product)
    state.createdData = product;
  },

  saveUpdatedProduct: (state, product) => {
    state.products.unshift(product)
    state.updatedData = product;
  },

  setProductIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setProductIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setProductIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setProductIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}