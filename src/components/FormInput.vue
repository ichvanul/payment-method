<template>
  <div class="form-group" :class="{'active': value !== ''}">
    <slot name="label">
      <label :for="id !== '' ? id : `input-${formatId}`"
             class="form-input-label">{{ label }}</label>
    </slot>
    <input :id="id !== '' ? id : `input-${formatId}`"
           :type="type" class="form-input-control" ref="inputControl"
           :value="value" @input="onInput" :disabled="disabled"
           :maxlength="maxlength" @keypress="onlyNumAndComma"
           @focus="inputFocus" @blur="inputBlur">
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    maxlength: {
      type: Number,
    },
    formatNumber: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean || String,
    },
  },
  computed: {
    formatId() {
      let mask = '';
      mask += '0123456789';
      let result = '';
      for (let i = 4; i > 0; --i) {
        result += mask[Math.round(Math.random() * (mask.length - 1))];
      }
      return result;
    },
  },
  methods: {
    onlyNumAndComma(e) {
      if (this.formatNumber) {
        switch (e.keyCode) {
          case 43:
          case 44:
          case 45:
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            break;
          default:
            e.preventDefault();
            break;
        }
      }
    },
    inputFocus(e) {
      e.target.parentElement.classList.add('active');
    },
    inputBlur(e) {
      if (!e.target.value) {
        e.target.parentElement.classList.remove('active');
      }
    },
    onInput() {
      this.$emit('input', this.$refs.inputControl.value);
    },
  },
};
</script>

<style scoped>

</style>
