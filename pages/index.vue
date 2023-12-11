<template>
  <div id="app">
    <div class="landing-page">
      <img src="@/assets/logo.png" alt="Company Logo" class="logo" />
      <h1>{{ companyName }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    LandingPage,
  },
};
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.landing-page {
  text-align: center;
  margin-top: 50px;
}

.logo {
  max-width: 200px;
}

h1 {
  color: #333;
}
</style>
