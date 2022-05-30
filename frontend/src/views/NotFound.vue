<style module>
.content {
  overflow-y: scroll;
  max-height: 90vh;
}
</style>

<template>
  <div :class="$style.content">
    <h1>Error</h1>
    <p>Page could not be found. Try again</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {};
  },
  async created() {
    // Component mount
  },
  methods: {},
};
</script>
