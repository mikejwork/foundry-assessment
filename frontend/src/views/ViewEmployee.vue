<style module>
.editable_input {
  border-bottom: 1px solid rgba(0, 0, 0, 0.507);
}

.employee_field {
  margin-bottom: 1ex;
}

.edit {
  margin-top: 2ex;
  width: 100%;
}
</style>

<template>
  <div>
    <h1>Employee</h1>
    <h4 :class="$style.employee_field">
      Name:
      <input
        :class="$style.editable_input"
        type="text"
        v-model="employee.name"
      />
    </h4>
    <h4 :class="$style.employee_field">Identifier: {{ employee.id }}</h4>
    <br />
    <h2 :class="$style.employee_field">Engagements</h2>
    <Engagements :employee_id="employee.id" />

    <v-btn :class="$style.edit" @click="updateEmployee">Save</v-btn>
  </div>
</template>

<script>
// API
import employeeAPI from "../api/employees";

// Components
import Engagements from "../components/Engagements.vue";

export default {
  components: { Engagements },
  name: "ViewEmployee",
  data() {
    return {
      employee: {},
    };
  },
  async created() {
    // Component mount
    var employeeID = this.$route.params.id;

    this.employee = await employeeAPI.getById(employeeID);
  },
  methods: {
    async updateEmployee() {
      await employeeAPI.update(this.employee.id, this.employee.name);
    },
  },
};
</script>
