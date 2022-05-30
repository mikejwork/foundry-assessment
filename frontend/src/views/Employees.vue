<style module>
.employee {
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

.employee_name_input {
  color: black;
  background-color: #d3d3d3;
  margin: 0ex 0ex 1ex 0ex;
  padding: 1ex 2ex 1ex 2ex;
  font-size: 9pt;
  border-radius: 1ex;
  width: 100%;
}

.add_employee_btn {
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
    <h1>Employees</h1>
    <br />
    <input
      v-model="filter"
      type="text"
      placeholder="Search employee by name or id.."
      :class="$style.filter_input"
    />
    <div v-for="employee in employees" :key="employee.id">
      <div
        :class="$style.employee"
        v-if="
          employee.name.toLowerCase().includes(filter.toLowerCase()) ||
          employee.id.toLowerCase().includes(filter.toLowerCase())
        "
      >
        <span :class="$style.header">
          <v-icon :class="$style.icon">mdi-account</v-icon>
          <h2>{{ employee.name }}</h2>
          <v-icon :class="$style.edit_icon" @click="editHandler(employee.id)"
            >mdi-account-edit</v-icon
          >
          <v-icon
            :class="$style.delete_icon"
            @click="deleteHandler(employee.id)"
            >mdi-account-off</v-icon
          >
        </span>
        <Engagements :employee_id="employee.id" />
      </div>
    </div>
    <div :class="$style.add_employee_container" v-if="addContainerOpen">
      <input
        v-model="newEmployeeName"
        type="text"
        placeholder="New employee name.."
        :class="$style.employee_name_input"
      />
    </div>

    <v-btn @click="addHandler()" :class="$style.add_employee_btn">{{
      addContainerOpen ? "Confirm" : "Add employee"
    }}</v-btn>
  </div>
</template>

<script>
// Components
import Engagements from "../components/Engagements.vue";

// API
import employeeAPI from "../api/employees";

export default {
  components: { Engagements },
  name: "Employees",
  data() {
    return {
      employees: [],
      filter: "",
      newEmployeeName: "",
      addContainerOpen: false,
    };
  },
  async created() {
    // Component mount
    this.employees = await employeeAPI.getAll();
  },
  methods: {
    async addHandler() {
      this.addContainerOpen = !this.addContainerOpen;

      if (this.newEmployeeName !== "") {
        employeeAPI.create(this.newEmployeeName);
        this.employees = await employeeAPI.getAll();
        this.newEmployeeName = "";
      }
    },
    async deleteHandler(id) {
      await employeeAPI.delete(id);
      this.employees = await employeeAPI.getAll();
    },
    async editHandler(id) {
      this.$router.push(`/employees/${id}`);
    },
  },
};
</script>
