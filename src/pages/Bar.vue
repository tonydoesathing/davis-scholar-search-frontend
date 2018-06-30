<template>
    <div>
      <h1>meow</h1>
      <p>{{id}}</p>
      <p>{{postid}}</p>
    </div>
</template>

<script>
export default {
  name: "Bar",
  props: {
    id: {
      type: String,
      default: "meow"
    },
    postid: {
      type: String,
      default: "HAMSTER"
    }
  }
};
</script>
