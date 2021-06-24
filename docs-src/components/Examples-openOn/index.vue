<template src="./template.html">
</template>

<script>
export default {
  name: 'examples-openOn',
  data() {
    return {
      openOn: 'left'
    }
  },
  methods: {
    showModal() {
      this.$showModal({
        component: 'modal-1',
        height: 600,
        width: 600,
        openOn: this.openOn
      });
    }
  }
};
</script>

<style lang="less">
</style>
