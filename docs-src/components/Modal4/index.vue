<template src="./template.html">
</template>

<script>
export default {
  name: 'modal-4',
  props: {},
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }
};
</script>

<style lang="less">
#modal-4 {
    padding: 45px;
}
</style>
