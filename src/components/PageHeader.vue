<template>
  <div>
    <h1>{{ title }}</h1>
    <TOC/>
  </div>
    
</template>

<script>
import TOC from "./TOC";

export default {
  name: "PageHeader",
  props: ['title'],
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    TOC
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
