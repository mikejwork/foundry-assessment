<style module>
.editable_input {
  border-bottom: 1px solid rgba(0, 0, 0, 0.507);
}

.client_field {
  margin-bottom: 1ex;
}

.edit {
  margin-top: 2ex;
  width: 100%;
}
</style>

<template>
  <div>
    <h1>Client</h1>
    <h4 :class="$style.client_field">
      Name:
      <input :class="$style.editable_input" type="text" v-model="client.name" />
    </h4>
    <h4 :class="$style.client_field">Identifier: {{ client.id }}</h4>
    <br />
    <h2 :class="$style.client_field">Engagements</h2>
    <Engagements :client_id="client.id" />

    <v-btn :class="$style.edit" @click="updateClient">Save</v-btn>
  </div>
</template>

<script>
// API
import clientAPI from "../api/clients";

// Components
import Engagements from "../components/Engagements.vue";

export default {
  components: { Engagements },
  name: "ViewClient",
  data() {
    return {
      client: {},
    };
  },
  async created() {
    // Component mount
    var clientID = this.$route.params.id;

    try {
      this.client = await clientAPI.getById(clientID);
    } catch (e) {
      this.$router.push(`/notfound`);
    }
  },
  methods: {
    async updateClient() {
      await clientAPI.update(this.client.id, this.client.name);
    },
  },
};
</script>
