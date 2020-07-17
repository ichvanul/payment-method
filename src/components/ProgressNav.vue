<template>
  <div class="progress">
    <div :class="[`badge badge-${variant}`, {'disabled': disabled}]">{{ no }}</div>
    <span :class="`progress--text text-${variant} ml-5 mr-7`">{{ text }}</span>
    <span :class="`progress--icon text-${variant}`"
          v-if="!isLast">
      <i class="fa fa-angle-right"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ProgressNav',
  props: {
    no: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    isLast: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped>

</style>
