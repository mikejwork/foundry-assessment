<style module>
.editable_input {
  border-bottom: 1px solid rgba(0, 0, 0, 0.507);
}

.engagement_field {
  margin-bottom: 1ex;
}

.edit {
  margin-top: 2ex;
  width: 100%;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1ex;
}

.table th {
  text-align: left;
  color: black;
  /* background-color: #252525; */
  padding: 0.5ex 1ex 0.5ex 1ex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}

.table td {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.5ex 1ex 0.5ex 1ex;
  background-color: rgb(207, 207, 207);
}

.input_row {
  background-color: rgb(230, 230, 230) !important;
}

.stretch_input {
  margin: 0;
  width: 100%;
  border: none;
  outline: none;
}
</style>

<style scoped>
.current {
  text-align: center;
  color: lawngreen;
  background-color: rgb(71, 141, 0);
}

.future {
  text-align: center;
  color: rgb(0, 214, 252);
  background-color: rgb(0, 125, 141);
}

.ended {
  text-align: center;
  color: rgb(255, 30, 0);
  background-color: rgb(155, 38, 34);
}

u {
  cursor: pointer;
}
</style>

<template>
  <div>
    <h1>Engagement</h1>
    <table :class="$style.table">
      <tr>
        <th>Engagement ID</th>
        <th>Name</th>
        <th>Employee</th>
        <th>Client</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
      <tr>
        <td>{{ engagement.id }}</td>
        <td :class="$style.input_row">
          <input
            v-model="engagement.name"
            type="text"
            placeholder="Engagement name"
            :class="$style.stretch_input"
          />
        </td>
        <td>
          <u @click="goToEmployee(engagement.employee)">{{
            engagement.employee
          }}</u>
        </td>
        <td>
          <u @click="goToClient(engagement.client)">{{ engagement.client }}</u>
        </td>
        <td :class="$style.input_row">
          <input
            v-model="engagement.description"
            type="text"
            placeholder="Engagement description"
            :class="$style.stretch_input"
          />
        </td>
        <td :class="engagement.status">{{ engagement.status }}</td>
      </tr>
    </table>

    <v-btn :class="$style.edit" @click="updateEngagement">Save</v-btn>
  </div>
</template>

<script>
// API
import engagementAPI from "../api/engagements";

export default {
  name: "ViewEngagement",
  data() {
    return {
      engagement: {},
      clients: [],
      employees: [],
    };
  },
  async created() {
    // Component mount
    var engagementID = this.$route.params.id;

    try {
      this.engagement = await engagementAPI.getById(engagementID);
      this.engagement.status = this.getEngagementStatus(this.engagement);
    } catch (e) {
      this.$router.push(`/notfound`);
    }
  },
  methods: {
    async updateEngagement() {
      await engagementAPI.update(this.engagement.id, this.engagement.name);
    },
    getEngagementStatus(engagement) {
      if (engagement.ended !== undefined) {
        return "ended";
      } else {
        let start = new Date(engagement.started);
        let now = Date.now();

        return start < now ? "current" : "future";
      }
    },
    goToClient(id) {
      this.$router.push(`/clients/${id}`);
    },
    goToEmployee(id) {
      this.$router.push(`/employees/${id}`);
    },
  },
};
</script>
