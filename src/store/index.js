import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as ls from 'local-storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    progress: 1,
    sendAsDropshipper: false,
    dropshippingFee: 5900,
    costOfGoods: 500000,
    shipment: '',
    shipmentPrice: 0,
    payment: '',
    dataDelivery: {
      email: '',
      dropshipperName: '',
      phoneNumber: '',
      dropshipperPhone: '',
      deliveryAddress: '',
    },
  },
  mutations: {
    SET_PROGRESS(state, progress) {
      state.progress = progress;
    },
    SET_SHIPMENT(state, shipment) {
      state.shipment = shipment;
    },
    SET_SHIPMENT_PRICE(state, shipmentPrice) {
      state.shipmentPrice = shipmentPrice;
    },
    SET_PAYMENT(state, payment) {
      state.payment = payment;
    },
    SET_SEND_AS_DROPSHIPPER(state, sendAsDropshipper) {
      state.sendAsDropshipper = sendAsDropshipper;
    },
    SET_DATADELIVERY(state, dataDelivery) {
      state.dataDelivery = dataDelivery;
    },
  },
  actions: {
    sendDataDelivery({ commit }, data) {
      commit('SET_DATADELIVERY', data);
    },
    resetAll({ commit }) {
      const data = {
        email: '',
        dropshipperName: '',
        phoneNumber: '',
        dropshipperPhone: '',
        deliveryAddress: '',
      };
      commit('SET_DATADELIVERY', data);
      commit('SET_PROGRESS', 1);
      commit('SET_SHIPMENT', '');
      commit('SET_SHIPMENT_PRICE', 0);
      commit('SET_PAYMENT', '');
      commit('SET_SEND_AS_DROPSHIPPER', false);
    },
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key),
      },
    }),
  ],
});
