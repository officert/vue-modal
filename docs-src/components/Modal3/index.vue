<template src="./template.html">
</template>

<script>
export default {
  name: 'modal-3',
  props: {},
  data() {
    return {
      name: null
    }
  },
  methods: {
    openModal() {
      this.$showModal({
        component: 'modal-4',
        width: 600,
        openOn: 'left'
      });
    }
  }
};
</script>

<style lang="less">
#modal-3 {
    padding: 45px;
}
</style>
