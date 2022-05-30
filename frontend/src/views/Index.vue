<style module>
.info {
  overflow-y: scroll;
  max-height: 90vh;
}
</style>

<template>
  <div :class="$style.info">
    <h1>Homepage</h1>
    <p>Welcome to the client engagement manager</p>
    <h3>Usage guide</h3>
    <p>
      The "Employee" tab will show all employees and their engagements. To
      delete or edit an employee, click the icons at the top right of the
      employee
    </p>
    <img
      src="https://i.imgur.com/G0ET7RF.png"
      alt="A mouse cursor hovering over an edit button"
    />
    <p>
      To filter employees by name or ID, type into the filter bar located at the
      top of the page.
    </p>
    <img src="https://i.imgur.com/fvO6hN1.png" alt="A filter bar" />
    <p>
      To add an employee, click the "Add employee" button located at the bottom
      of the page. Enter an employee name and click "Confirm".
    </p>
    <img
      src="https://i.imgur.com/bwClT8D.png"
      alt="A name input and a confirm button"
    />
    <p>To edit an employee, edit "Name" or "Description" & save</p>
    <strong>All of the above is true for the "Clients" page.</strong>
    <p>
      The "Engagements" page shows all ongoing engagements, to create a new one,
      enter the relevant data into the bottom row, and click "Create"
    </p>
    <p>
      Each engagement includes the following actions respectively, "View",
      "Delete", "End"
    </p>
    <img
      src="https://i.imgur.com/QaPWoWx.png"
      alt="Three icons for View, Delete & End"
    />
    <p>
      To filter engagements by name, client, employee or ID, type into the
      filter bar located at the top of the page.
    </p>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  async created() {
    // Component mount
  },
  methods: {},
};
</script>
