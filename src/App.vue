<template>
  <div id="app">
    <PageHeader title="Meow"/>
  </div>
</template>

<script>
import PageHeader from "./components/PageHeader";

export default {
  name: "App",
  components: {
    PageHeader
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
