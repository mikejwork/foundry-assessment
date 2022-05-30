<style module>
.client {
  padding: 2ex;
  background-color: white;
  border-radius: 0.7ex;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.527);
  margin-bottom: 2ex;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.icon {
  margin-right: 1ex;
}

.client_name_input {
  color: black;
  background-color: #d3d3d3;
  margin: 0ex 0ex 1ex 0ex;
  padding: 1ex 2ex 1ex 2ex;
  font-size: 9pt;
  border-radius: 1ex;
  width: 100%;
}

.add_client_btn {
  width: 100%;
}

.delete_icon {
  cursor: pointer;
  margin-left: 1ex;
  color: rgb(196, 16, 16) !important;
}

.edit_icon {
  cursor: pointer;
  margin-left: auto;
  color: rgb(16, 160, 196) !important;
}

.filter_input {
  color: black;
  background-color: #bbbbbb;
  margin: 0ex 0ex 1ex 0ex;
  padding: 1ex 2ex 1ex 2ex;
  font-size: 9pt;
  border-radius: 1ex;
  width: 100%;
}
</style>

<template>
  <div>
    <h1>Clients</h1>
    <br />
    <input
      v-model="filter"
      type="text"
      placeholder="Search client by name or id.."
      :class="$style.filter_input"
    />
    <div v-for="client in clients" :key="client.id">
      <div
        :class="$style.client"
        v-if="
          client.name.toLowerCase().includes(filter.toLowerCase()) ||
          client.id.toLowerCase().includes(filter.toLowerCase())
        "
      >
        <span :class="$style.header">
          <v-icon :class="$style.icon">mdi-account</v-icon>
          <h2>{{ client.name }}</h2>
          <v-icon :class="$style.edit_icon" @click="editHandler(client.id)"
            >mdi-account-edit</v-icon
          >
          <v-icon :class="$style.delete_icon" @click="deleteHandler(client.id)"
            >mdi-account-off</v-icon
          >
        </span>
        <Engagements :client_id="client.id" />
      </div>
    </div>
    <div :class="$style.add_client_container" v-if="addContainerOpen">
      <input
        v-model="newClientName"
        type="text"
        placeholder="New client name.."
        :class="$style.client_name_input"
      />
    </div>

    <v-btn @click="addHandler()" :class="$style.add_client_btn">{{
      addContainerOpen ? "Confirm" : "Add client"
    }}</v-btn>
  </div>
</template>

<script>
// Components
import Engagements from "../components/Engagements.vue";

// API
import clientAPI from "../api/clients";

export default {
  components: { Engagements },
  name: "Clients",
  data() {
    return {
      clients: [],
      filter: "",
      newClientName: "",
      addContainerOpen: false,
    };
  },
  async created() {
    // Component mount
    this.clients = await clientAPI.getAll();
  },
  methods: {
    async addHandler() {
      this.addContainerOpen = !this.addContainerOpen;

      if (this.newClientName !== "") {
        clientAPI.create(this.newClientName);
        this.clients = await clientAPI.getAll();
        this.newClientName = "";
      }
    },
    async deleteHandler(id) {
      await clientAPI.delete(id);
      this.clients = await clientAPI.getAll();
    },
    async editHandler(id) {
      this.$router.push(`/clients/${id}`);
    },
  },
};
</script>
