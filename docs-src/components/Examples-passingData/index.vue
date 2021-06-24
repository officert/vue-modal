<template src="./template.html">
</template>

<script>
export default {
  name: 'examples-passing-data',
  data() {
    return {
      name: null,
      age: null
    }
  },
  methods: {
    showModal() {
      const modalResult = this.$showModal({
        component: 'modal-2',
        width: 600,
        openOn: 'right',
        props: {
          age: this.age
        }
      });

      modalResult.promise
        .then(result => {
          this.name = result;
        });
    }
  }
};
</script>

<style lang="less">
</style>
