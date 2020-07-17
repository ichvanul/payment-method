<template>
<div class="form-group">
  <label :for="id !== '' ? id : label" class="form-input-label">{{ label }}</label>
  <textarea :id="id !== '' ? id : label" :cols="cols" :rows="rows"
            class="form-input-control" :style="noResize ? 'resize: none' : ''"
            ref="inputControl" :disabled="disabled"
            :value="value" @input="onInput"
            :maxlength="maxlength"
            @focus="inputFocus" @blur="inputBlur"
  ></textarea>
</div>
</template>

<script>
export default {
  name: 'FormTextarea',
  props: {
    id: {
      type: String,
      default: '',
    },
    cols: {
      type: String || Number,
      default: '30',
      required: false,
    },
    rows: {
      type: String || Number,
      default: '5',
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    noResize: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
    },
    disabled: {
      type: Boolean || String,
      required: false,
    },
    value: {
      type: String,
    },
  },
  methods: {
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
