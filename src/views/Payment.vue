<template>
<div class="container">
  <div class="text-center mb-md-n8">
    <div class="inline-block rounded-full bg-secondary py-5 pl-6 pr-3">
      <ProgressNav no="1" text="Delivery"
                   variant="primary">
      </ProgressNav>
      <ProgressNav no="2" text="Payment"
                   variant="primary" class="mx-5"
                   :disabled="progress !== 2 && progress !== 3">
      </ProgressNav>
      <ProgressNav no="3" text="Finish"
                   variant="primary"
                   :disabled="progress !== 3"
                   is-last>
      </ProgressNav>
    </div>
  </div>
  <div class="card shadow-primary mb-5">
    <div class="row">
      <div class="col-md-8">
        <div class="py-md-4 pl-md-4">
          <a href="#" @click="backToDelivery" class="text-black">
            <i class="fa fa-arrow-left mr-3"></i>
            Back to delivery
          </a>
          <div class="card-header mb-8">
            <div class="card-header--title text-primary mt-4">Shipment</div>
          </div>
          <div class="row mb-12">
            <div class="col-md-4 pr-md-0">
              <box title="GO-SEND" price="15,000" @click="chooseShipment('go-send', 15000)"
                   :class="{'active': shipment === 'go-send'}"></box>
            </div>
            <div class="col-md-4 pr-md-0">
              <box title="JNE" price="9,000" @click="chooseShipment('jne', 9000)"
                   :class="{'active': shipment === 'jne'}"></box>
            </div>
            <div class="col-md-4">
              <box title="Personal Courier" price="29,000"
                   @click="chooseShipment('personal courier', 29000)"
                   :class="{'active': shipment === 'personal courier'}"></box>
            </div>
          </div>
          <div class="card-header mb-8">
            <div class="card-header--title text-primary mt-4">Payment</div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-md-0">
              <box title="e-Wallet" price="1,500,000 left" @click="choosePayment('e-Wallet')"
                   :class="{'active': payment === 'e-Wallet'}"></box>
            </div>
            <div class="col-md-4 pr-md-0">
              <box title="Bank Transfer" @click="choosePayment('Bank Transfer')"
                   :class="{'active': payment === 'Bank Transfer'}"></box>
            </div>
            <div class="col-md-4">
              <box title="Virtual Account"
                   @click="choosePayment('Virtual Account')"
                   :class="{'active': payment === 'Virtual Account'}"></box>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="py-md-4 pr-md-2 pl-md-12">
          <div class="card-side pl-3">
            <div class="card-side-header pt-4">
              <div class="card-side--title text-primary mt-4 mb-3">Summary</div>
              <div class="mb-6">10 items purchased</div>
              <div class="border mb-6"></div>
              <div class="mb-1">Delivery estimation</div>
              <div class="text-bold text-success" v-show="deliveryEstimate !== ''">{{ deliveryEstimate }} by {{ shipment | uppercase }}</div>
            </div>
            <div class="card-side-body card-side-body-payment">
              <div class="flex justify-between mb-2">
                <span>Cost of Goods</span>
                <span class="text-bold">{{ costOfGoods | numeralFormat }}</span>
              </div>
              <div class="flex justify-between mb-2" v-if="sendAsDropshipper">
                <span>Dropshipping Fee</span>
                <span class="text-bold">{{ dropshippingFee | numeralFormat }}</span>
              </div>
              <div class="flex justify-between mb-5">
                <span><span class="text-bold">{{ shipment | uppercase }}</span> shipment</span>
                <span class="text-bold">{{ shipmentPrice | numeralFormat }}</span>
              </div>
              <div class="flex justify-between total">
                <span class="text-primary text-bold">Total</span>
                <span class="text-primary text-bold" v-if="sendAsDropshipper">
                  {{ costOfGoods + dropshippingFee + shipmentPrice | numeralFormat }}
                </span>
                <span class="text-primary text-bold" v-else>{{ costOfGoods + shipmentPrice | numeralFormat }}</span>
              </div>
              <button class="button button-primary button-block button-lg mt-4"
                      type="button" @click="finish" :disabled="shipment === '' || payment === ''">Pay with {{ payment }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import ProgressNav from '../components/ProgressNav.vue';
import Box from '../components/Box.vue';

export default {
  name: 'Payment',
  components: {
    ProgressNav,
    Box,
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    },
  },
  computed: {
    ...mapState(
      ['progress', 'shipment',
        'shipmentPrice', 'payment',
        'sendAsDropshipper', 'dropshippingFee',
        'costOfGoods',
      ],
    ),
    deliveryEstimate() {
      if (this.shipment === 'go-send') {
        return 'today';
      }
      if (this.shipment === 'jne') {
        return '2 days';
      }
      if (this.shipment === 'personal courier') {
        return '1 day';
      }
      return '';
    },
  },
  methods: {
    finish() {
      this.$router.push('/finish');
      this.$store.commit('SET_PROGRESS', 3);
    },
    backToDelivery() {
      this.$router.push('/');
      this.$store.commit('SET_PROGRESS', 1);
    },
    chooseShipment(value, price) {
      this.$store.commit('SET_SHIPMENT', value);
      this.$store.commit('SET_SHIPMENT_PRICE', price);
    },
    choosePayment(value) {
      this.$store.commit('SET_PAYMENT', value);
    },
  },
};
</script>

<style scoped>

</style>
