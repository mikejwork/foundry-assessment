<style module>
</style>

<template>
  <div>
    <h1>Engagements</h1>
    <Engagements :canFilter="true" :editable="true" />
  </div>
</template>

<script>
// Components
import Engagements from "../components/Engagements.vue";

export default {
  components: { Engagements },
  name: "EngagementsList",
  data() {
    return {};
  },
  async created() {
    // Component mount
  },
  methods: {},
};
</script>
