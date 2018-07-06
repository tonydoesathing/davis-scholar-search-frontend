<template>
  <div class="router-view">
    
    <router-view class="router-view"></router-view>
    
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
.router-view {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
