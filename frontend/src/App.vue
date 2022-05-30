<style module>
.index {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.navigation {
  width: 30ex;
  height: 100%;
  color: white;
  padding: 2ex;
  background-color: #0f0f0f;

  display: flex;
  flex-direction: column;
}

.navigation > p {
  color: grey;
  font-size: 9pt;
}

.navigation > hr {
  opacity: 0.2;
  margin-bottom: 1ex;
}

.navigation > span {
  cursor: pointer;
  color: grey;
  font-weight: 500;
  margin: 1ex 0ex 1ex 0ex;
}

.navigation > span:hover {
  filter: brightness(1.2);
}

.navigation > span:active {
  filter: brightness(0.8);
}

.content {
  padding: 3ex;
  width: 100%;
}
</style>

<template>
  <v-app>
    <div :class="$style.index">
      <div :class="$style.navigation">
        <h3>Blackbook Foundry</h3>
        <p>Client engagement manager</p>
        <hr />
        <span @click="navigate('/')">Home</span>
        <span @click="navigate('/employees')">Employees</span>
        <span @click="navigate('/clients')">Clients</span>
        <span @click="navigate('/engagements')">Engagements</span>
      </div>
      <div :class="$style.content">
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {};
  },
  methods: {
    navigate(page) {
      if (page !== this.$route.path) this.$router.push(page);
    },
  },
};
</script>
