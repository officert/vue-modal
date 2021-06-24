<template src="./template.html">
</template>

<script>
export default {
  name: 'modal-2',
  props: {
    age: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: null
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', this.name);
    }
  }
};
</script>

<style lang="less">
#modal-2 {
    padding: 45px;
}
</style>
