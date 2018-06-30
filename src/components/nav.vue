<template>
  <div>
    <label for="idinput">ID:</label>
    <input id="idinput" type="text" v-model="id">
    <label for="postidinput">Post ID:</label>
    <input id="postidinput" type="text" v-model="postid">

    <router-link to="/foo">Go to Foo</router-link>
    <router-link v-bind:to="'/bar?id='+id+'&postid='+postid">Go to Bar</router-link>
		
  </div>
</template>

<script>
export default {
  name: "Nav",
  data: function() {
    return {
      id: "",
      postid: ""
    };
  }
};
</script>
