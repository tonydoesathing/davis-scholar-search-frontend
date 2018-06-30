<template>
  <div>
    <Menu/>
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "./components/menu";

export default {
  name: "App",
  data: function() {
    return {};
  },
  components: {
    Menu
  }
};
</script>

<style>

</style>
