<template>
  <div id="app">
  
  
    <h1>Hello App!</h1>
		<Nav/>
		<!-- route outlet -->
		<!-- component matched by the route will render here -->
		<router-view></router-view>
  </div>
</template>

<script>
import Nav from "./components/nav";

export default {
  name: "App",
  components: {
    Nav
  }
};
</script>
