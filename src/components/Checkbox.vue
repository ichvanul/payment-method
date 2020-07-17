<template>
  <div class="checkbox">
    <input id="checkbox" type="checkbox" :value="val" v-model="checked" @change="onChange">
    <label for="checkbox" class="checkbox-input"></label>
    <label for="checkbox" class="checkbox-title">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: ['label', 'val', 'value'],
  data: () => ({
    checkedProxy: false,
  }),
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedProxy = val;
      },
    },
  },
  methods: {
    onChange() {
      this.$emit('input', this.checkedProxy);
    },
  },
};
</script>

<style scoped>

</style>
