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
      <div class="col-md-8 vertical-center">
        <div class="py-4 pl-4">
          <div class="card-header justify-start justify-center-md">
            <div class="card-header--title text-primary mt-4">Thank you</div>
          </div>
          <div class="card-body mt-6">
            <div class="content-center ml-md-n12 mb-2">
              <span class="ml-md-n8">Order ID : {{ randomOrderID }}</span>
            </div>
            <div class="content-center ml-md-12 mb-12">
              <span class="mr-n20 text-gray">Your order will be delivered {{ deliveryEstimate }} with {{ shipment | uppercase }}</span>
            </div>
            <div class="content-center ml-md-n12">
              <a href="#" @click="toHompage" class="text-dark ml-md-n4"><i class="fa fa-arrow-left"></i> Go to homepage</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="py-md-4 pr-md-2 pl-md-12">
          <div class="card-side pl-3">
            <div class="card-side-header pt-4">
              <div class="card-side--title text-primary mt-4 mb-3">Summary</div>
              <div>10 items purchased</div>
              <div class="border my-6"></div>
              <div class="mb-1">Delivery estimation</div>
              <div class="text-bold text-success">{{ deliveryEstimate }} by {{ shipment | uppercase }}</div>
              <div class="border my-6"></div>
              <div class="mb-1">Payment method</div>
              <div class="text-bold text-success">{{ payment }}</div>
            </div>
            <div class="card-side-body card-side-body-finish">
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

export default {
  name: 'Finish',
  components: {
    ProgressNav,
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
    randomOrderID() {
      return this.randomString(5, '#A');
    },
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
      return '-';
    },
  },
  methods: {
    randomString(length, chars) {
      let mask = '';
      if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
      if (chars.indexOf('A') > -1) mask += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
      if (chars.indexOf('#') > -1) mask += '23456789';
      if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
      let result = '';
      for (let i = length; i > 0; --i) {
        result += mask[Math.round(Math.random() * (mask.length - 1))];
      }
      return result;
    },
    toHompage() {
      this.$router.push('/');
      this.$store.dispatch('resetAll');
    },
  },
};
</script>

<style scoped>

</style>
