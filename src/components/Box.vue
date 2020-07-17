<template>
  <div class="box" ref="box" @click="handleClick" :class="{'no-price': price === ''}">
    <span>{{ title }}</span>
    <span class="text-bold">{{ price }}</span>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    title: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>

</style>
