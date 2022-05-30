<style module>
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

.engagement_actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.edit_icon:hover {
  cursor: pointer;
  color: rgb(16, 160, 196) !important;
}

.delete_icon:hover {
  cursor: pointer;
  color: rgb(196, 37, 16) !important;
}

.table_dropdown {
  width: 100%;
  outline: none;
}

.error {
  color: rgb(255, 30, 0);
  font-weight: bold;
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
    <p :class="$style.error" :v-if="errorMessage !== ''">{{ errorMessage }}</p>
    <table :class="$style.table">
      <tr v-if="canFilter" :class="$style.table_filter_row">
        <td colspan="10" :class="$style.input_row">
          <input
            v-model="filter"
            type="text"
            placeholder="Filter engagements by ID, Name, Client, etc."
            :class="$style.stretch_input"
          />
        </td>
      </tr>
      <tr>
        <th>Engagement ID</th>
        <th>Name</th>
        <template v-if="editable">
          <th>Employee</th>
          <th>Client</th>
        </template>
        <template v-else>
          <th>{{ client_id !== undefined ? "Employee" : "Client" }}</th>
        </template>
        <th>Description</th>
        <th>Status</th>
        <th v-if="editable">Actions</th>
      </tr>
      <tr v-for="engagement in engagements" :key="engagement.id">
        <template
          v-if="
            engagement.name.toLowerCase().includes(filter.toLowerCase()) ||
            engagement.id.toLowerCase().includes(filter.toLowerCase()) ||
            engagement.description
              .toLowerCase()
              .includes(filter.toLowerCase()) ||
            engagement.client.toLowerCase().includes(filter.toLowerCase()) ||
            engagement.employee.toLowerCase().includes(filter.toLowerCase())
          "
        >
          <td>
            <u @click="goToEngagement(engagement.id)">{{ engagement.id }}</u>
          </td>
          <td>{{ engagement.name }}</td>

          <template v-if="editable">
            <td>
              <u @click="goToEmployee(engagement.employee)">{{
                engagement.employee
              }}</u>
            </td>
            <td>
              <u @click="goToClient(engagement.client)">{{
                engagement.client
              }}</u>
            </td>
          </template>
          <template v-else>
            <td>
              <u
                v-if="client_id === undefined"
                @click="goToClient(engagement.client)"
                >{{ engagement.client }}</u
              >
              <u
                v-if="client_id !== undefined"
                @click="goToEmployee(engagement.employee)"
                >{{ engagement.employee }}</u
              >
            </td>
          </template>

          <td>{{ engagement.description }}</td>
          <td :class="engagement.status">{{ engagement.status }}</td>
          <td v-if="editable" :class="$style.engagement_actions">
            <v-icon
              :class="$style.edit_icon"
              @click="goToEngagement(engagement.id)"
              >mdi-archive-eye</v-icon
            >
            <v-icon
              :class="$style.delete_icon"
              @click="deleteHandler(engagement.id)"
              >mdi-archive-remove</v-icon
            >
            <v-icon
              :class="$style.delete_icon"
              @click="stopHandler(engagement.id)"
              >mdi-alert-circle-outline</v-icon
            >
          </td>
        </template>
      </tr>
      <tr v-if="editable" :class="$style.table_filter_row">
        <td></td>
        <td :class="$style.input_row">
          <input
            v-model="creation_data.name"
            type="text"
            placeholder="New engagement name.."
            :class="$style.stretch_input"
          />
        </td>
        <td>
          <select
            :class="$style.table_dropdown"
            v-model="creation_data.employee"
          >
            <option value="" disabled selected>Select employee..</option>
            <option
              v-for="employee in employees"
              :key="employee.id"
              :value="employee.id"
            >
              {{ employee.name }}
            </option>
          </select>
        </td>
        <td>
          <select :class="$style.table_dropdown" v-model="creation_data.client">
            <option value="" disabled selected>Select client..</option>
            <option
              v-for="client in clients"
              :key="client.id"
              :value="client.id"
            >
              {{ client.name }}
            </option>
          </select>
        </td>
        <td :class="$style.input_row">
          <input
            v-model="creation_data.description"
            type="text"
            placeholder="Description.."
            :class="$style.stretch_input"
          />
        </td>
        <td rowspan="2">
          <v-btn @click="creationHandler">Create</v-btn>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// API
import employeeAPI from "../api/employees";
import clientAPI from "../api/clients";
import engagementAPI from "../api/engagements";

export default {
  name: "Engagements",
  data() {
    return {
      engagements: [],
      employees: [],
      clients: [],
      filter: "",
      errorMessage: "",
      creation_data: {
        name: "",
        description: "",
        client: "",
        employee: "",
      },
    };
  },
  async created() {
    this.fetchClients();
    this.fetchEmployees();
    this.fetchEngagements();
  },
  watch: {
    // Watch for changes in props because for some reason on component mount isnt async with props?
    employee_id(value) {
      if (value !== undefined) this.fetchEngagements();
    },
    client_id(value) {
      if (value !== undefined) this.fetchEngagements();
    },
  },
  methods: {
    async fetchEngagements() {
      // Fetch data depending on props provided
      if (this.employee_id !== undefined) {
        this.engagements = await employeeAPI.getEngagements(this.employee_id);
      } else if (this.client_id !== undefined) {
        this.engagements = await clientAPI.getEngagements(this.client_id);
      } else {
        this.engagements = await engagementAPI.getAll();
      }

      this.engagements.forEach((engagement) => {
        engagement.status = this.getEngagementStatus(engagement);
      });
    },
    async fetchEmployees() {
      this.employees = await employeeAPI.getAll();
    },
    async fetchClients() {
      this.clients = await clientAPI.getAll();
    },
    async deleteHandler(id) {
      await engagementAPI.delete(id);
      this.fetchEngagements();
    },
    async creationHandler() {
      if (this.creation_data.name == "") {
        this.errorMessage = "Name is required";
        return;
      }

      if (this.creation_data.employee == "") {
        this.errorMessage = "Employee is required";
        return;
      }

      if (this.creation_data.client == "") {
        this.errorMessage = "Client is required";
        return;
      }

      await engagementAPI.create(
        this.creation_data.name,
        this.creation_data.client,
        this.creation_data.employee,
        this.creation_data.description
      );
      this.fetchEngagements();

      this.errorMessage = "";
      this.creation_data = {
        name: "",
        description: "",
        client: "",
        employee: "",
      };
    },
    async stopHandler(id) {
      await engagementAPI.end(id);
      this.fetchEngagements();
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
    goToEngagement(id) {
      this.$router.push(`/engagements/${id}`);
    },
    goToClient(id) {
      this.$router.push(`/clients/${id}`);
    },
    goToEmployee(id) {
      this.$router.push(`/employees/${id}`);
    },
  },
  props: {
    employee_id: {
      type: String,
      required: false,
    },
    client_id: {
      type: String,
      required: false,
    },
    canFilter: {
      type: Boolean,
      required: false,
    },
    editable: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
