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
    <ValidationObserver v-slot="{passes, invalid}">
      <div class="card shadow-primary mb-5">
        <div class="row">
          <div class="col-md-8">
            <div class="py-md-4 pl-md-4">
              <router-link to="/" class="text-black">
                <i class="fa fa-arrow-left mr-3"></i>
                Back to cart
              </router-link>
              <div class="card-header mb-4">
                <div class="card-header--title text-primary mt-4">Delivery details</div>
                <checkbox label="Send as dropshipper"
                          v-model="sendDropshipper"
                          class="mt-6"></checkbox>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <ValidationProvider rules="email" name="email" v-slot="{errors, passed}">
                      <form-input label="Email" type="email"
                                  :class="[{'is-invalid': errors.length !== 0},
                                           {'is-valid': errors.length === 0 && passed}]"
                                  v-model="data.name"></form-input>
                      <span class="invalid-feedback" v-show="errors.length !== 0">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider :rules="{regex : /^[+()\d-,]+$/, min:6 }"
                                        name="phone number"
                                        v-slot="{errors, passed}">
                      <form-input label="Phone Number"
                                  :maxlength="20"
                                  format-number
                                  :class="[{'is-invalid': errors.length !== 0},
                                           {'is-valid': errors.length === 0 && passed}]"
                                  v-model="data.phoneNumber"></form-input>
                      <span class="invalid-feedback" v-show="errors.length !== 0">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider rules="required|max:120" name="delivery address" v-slot="{errors, passed}">
                      <form-textarea label="Delivery Address"
                                     :class="[{'is-invalid': errors.length !== 0},
                                           {'is-valid': errors.length === 0 && passed}]"
                                     no-resize
                                     :maxlength="120"
                                     v-model="data.deliveryAddress"
                      ></form-textarea>
                      <span class="invalid-feedback" v-show="errors.length !== 0">{{ errors[0] }}</span>
                      <div class="mt-n1 text-right counter-caracter">{{ 120 - data.deliveryAddress.length }} / 120</div>
                    </ValidationProvider>
                  </div>
                  <div class="col-md-6">
                    <ValidationProvider :rules="{required: sendDropshipper}" name="dropshipper name" v-slot="{errors, passed}">
                      <form-input label="Dropshipper name"
                                  :class="[{'is-invalid': errors.length !== 0},
                                           {'is-valid': errors.length === 0 && passed}]"
                                  v-model="data.dropshipperName"
                                  :disabled="!sendDropshipper"></form-input>
                      <span class="invalid-feedback" v-show="errors.length !== 0">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider :rules="{regex : /^[+()\d-,]+$/, min:6, required : sendDropshipper}"
                                        name="dropshipper phone number"
                                        v-slot="{errors, passed}">
                      <form-input label="Dropshipper phone number"
                                  v-model="data.dropshipperPhone"
                                  :maxlength="20"
                                  format-number
                                  :class="[{'is-invalid': errors.length !== 0},
                                           {'is-valid': errors.length === 0 && passed}]"
                                  :disabled="!sendDropshipper"
                      ></form-input>
                      <span class="invalid-feedback" v-show="errors.length !== 0">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
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
                </div>
                <div class="card-side-body">
                  <div class="flex justify-between mb-2">
                    <span>Cost of Goods</span>
                    <span class="text-bold">{{ costOfGoods | numeralFormat }}</span>
                  </div>
                  <div class="flex justify-between mb-5" v-if="sendDropshipper">
                    <span>Dropshipping Fee</span>
                    <span class="text-bold">{{ dropshippingFee | numeralFormat }}</span>
                  </div>
                  <div class="flex justify-between total">
                    <span class="text-primary text-bold">Total</span>
                    <span class="text-primary text-bold" v-if="sendDropshipper">{{ costOfGoods + dropshippingFee | numeralFormat }}</span>
                    <span class="text-primary text-bold" v-else>{{ costOfGoods | numeralFormat }}</span>
                  </div>
                  <button class="button button-primary button-block button-lg mt-4"
                          type="button" @click="passes(toPayment)" :disabled="invalid">Continue to Payment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import ProgressNav from '../components/ProgressNav.vue';
import Checkbox from '../components/Checkbox.vue';
import FormInput from '../components/FormInput.vue';
import FormTextarea from '../components/FormTextarea.vue';

export default {
  name: 'home',
  components: {
    ProgressNav,
    Checkbox,
    FormInput,
    FormTextarea,
  },
  data() {
    return {
      sendDropshipper: this.$store.state.sendAsDropshipper,
    };
  },
  computed: {
    progress() {
      return this.$store.state.progress;
    },
    dropshippingFee() {
      return this.$store.state.dropshippingFee;
    },
    costOfGoods() {
      return this.$store.state.costOfGoods;
    },
    data() {
      return this.$store.state.dataDelivery;
    },
  },
  watch: {
    sendDropshipper() {
      this.$store.commit('SET_SEND_AS_DROPSHIPPER', this.sendDropshipper);
    },
  },
  methods: {
    toPayment() {
      this.$store.commit('SET_PROGRESS', 2);
      this.$router.push('/payment');
      const payload = {
        name: this.data.name,
        dropshipperName: this.data.dropshipperName,
        phoneNumber: this.data.phoneNumber,
        dropshipperPhone: this.data.dropshipperPhone,
        deliveryAddress: this.data.deliveryAddress,
      };
      this.$store.dispatch('sendDataDelivery', payload);
    },
  },
};
</script>
